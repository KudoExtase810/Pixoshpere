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

const Orders = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const query = searchParams.q;
    const sortBy = searchParams.sortBy || "createdAt";
    const page = parseInt(searchParams.page || "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectDB();

    const queryObj: any = {};
    if (query) {
        queryObj.label = { $regex: query, $options: "i" };
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }

    const orders = await Order.find<Order>(queryObj)
        .limit(limit)
        .skip(skip)
        .sort(sortObj);

    const totalDocs = await Order.countDocuments(queryObj);

    return (
        <>
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
                                <TableHead>Payment method</TableHead>
                                <TableHead>Amount</TableHead>
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
                <p className="flex items-center justify-center h-64">
                    No results were found.
                </p>
            )}
            <PaginationControls
                showingDocs={orders.length}
                totalDocs={totalDocs}
            />
        </>
    );
};

export default Orders;
