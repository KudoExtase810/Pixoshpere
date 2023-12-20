import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/utils";

interface props {
    latestOrders: Order[];
}

const LatestSales = ({ latestOrders }: props) => {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Latest Sales</CardTitle>
                <CardDescription>
                    You made 265 sales this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-80 pr-4">
                    <div className="space-y-8">
                        {latestOrders.length ? (
                            latestOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className="flex items-center"
                                >
                                    <User className="h-9 w-9 p-1 rounded-full" />
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {`${order.customer.firstName} ${order.customer.lastName}`}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.customer.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        {formatPrice(order.total)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center mt-[25%] text-muted-foreground">
                                You haven't made any sales yet.
                            </p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default LatestSales;
