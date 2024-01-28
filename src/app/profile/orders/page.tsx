import { getServerSession } from "@/auth/utils";
import OrderHistory from "@/components/customer/profile/OrderHistory";
import { Separator } from "@/components/ui/separator";
import Order from "@/models/order";

const Orders = async () => {
    const { userId } = await getServerSession();
    const userOrders = (await Order.find({ customer: userId })
        .select("products status total createdAt")
        .lean()) as Pick<
        Order,
        "_id" | "createdAt" | "products" | "status" | "total"
    >[];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Order History</h3>
                <p className="text-sm text-muted-foreground">
                    View details about your latest orders
                </p>
            </div>
            <Separator />
            {userOrders.length > 0 ? (
                <OrderHistory orders={userOrders} />
            ) : (
                <p className="text-center">
                    You haven't placed any orders yet.
                </p>
            )}
        </div>
    );
};

export default Orders;
