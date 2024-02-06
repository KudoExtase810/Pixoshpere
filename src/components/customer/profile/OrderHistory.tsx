"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useActionData } from "@/contexts/ActionContext";
import { useModal } from "@/contexts/ModalContext";
import { formatPrice } from "@/lib/utils";
import dayjs from "dayjs";
import { ReceiptText } from "lucide-react";

interface OrderHistoryProps {
    orders: Pick<
        Order,
        "_id" | "createdAt" | "products" | "status" | "total"
    >[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
    const { setActionData } = useActionData();
    const { toggle } = useModal();

    return (
        <div className="border rounded-md whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order, idx) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-medium">
                                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </TableCell>
                            <TableCell>
                                {dayjs(order.createdAt).format(
                                    "DD MMM YYYY | HH:mm"
                                )}
                            </TableCell>
                            <TableCell>
                                <Badge variant={order.status}>
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatPrice(order.total)}</TableCell>
                            <TableCell>
                                <Button
                                    // onClick={() => {
                                    //     setActionData(order as Order);
                                    //     toggle("orderDetails");
                                    // }}
                                    variant="ghost"
                                    className="p-1 h-min text-green-500 hover:text-green-600"
                                >
                                    <ReceiptText size={20} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderHistory;
