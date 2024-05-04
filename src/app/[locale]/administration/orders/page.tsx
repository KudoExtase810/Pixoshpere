import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import PaginationControls from "@/components/administration/PaginationControls";
import OrderRow from "@/components/administration/orders/OrderRow";
import Order from "@/models/order";
import connectDB from "@/lib/connectdb";
import OrderFilters from "@/components/administration/orders/OrderFilters";
import NoResults from "@/components/administration/NoResults";
import OrderStatusModal from "@/components/administration/orders/OrderStatusModal";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import User from "@/models/user";

const Orders = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const query = searchParams.q;
    const sortBy = searchParams.sortBy || "createdAt";
    const page = parseInt(searchParams.page || "1");
    const showDelivered = searchParams.showDelivered === "true";
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectDB();

    const queryObj: any = {};

    if (query) {
        const customer = (await User.findOne({ email: query })
            .select("_id")
            .lean()) as Pick<User, "_id"> | null;

        queryObj.customer = customer?._id;
    }

    if (!showDelivered) {
        queryObj.status = { $ne: "delivered" };
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }
    console.log(queryObj);
    const orders = (await Order.find(queryObj)
        .limit(limit)
        .skip(skip)
        .sort(sortObj)
        .populate({
            path: "customer",
            select: "firstName lastName phone email",
        })
        .lean()) as Order[];

    const totalDocs = await Order.countDocuments(queryObj);

    return (
        <>
            <OrderDetailsModal />
            <OrderStatusModal />
            <h1 className="border-b pb-2 pt-6 text-4xl font-semibold">
                Orders
            </h1>
            <OrderFilters />
            {orders.length > 0 ? (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Ordered On</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <OrderRow
                                    key={order._id}
                                    order={JSON.parse(JSON.stringify(order))}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <NoResults />
            )}
            <PaginationControls
                showingDocs={orders.length}
                totalDocs={totalDocs}
            />
        </>
    );
};

export default Orders;
