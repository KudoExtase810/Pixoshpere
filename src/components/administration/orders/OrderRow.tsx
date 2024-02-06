"use client";
import dayjs from "dayjs";

import { TableCell, TableRow } from "@/components/ui/table";
import { ReceiptText, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/contexts/ModalContext";
import { useActionData } from "@/contexts/ActionContext";

const OrderRow = ({ order }: { order: Order }) => {
    const { toggle } = useModal();
    const { setActionData } = useActionData();

    const editStatus = () => {
        setActionData(order);
        toggle("orderStatus");
    };

    const viewDetails = () => {
        // setActionData(order);
        // toggle("orderDetails");
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{`${order.customer.firstName} ${order.customer.lastName}`}</TableCell>
            <TableCell>
                {dayjs(order.createdAt).format("DD MMM YYYY | HH:mm")}
            </TableCell>
            <TableCell>{formatPrice(order.total)}</TableCell>
            <TableCell>
                <Badge variant={order.status}>{order.status}</Badge>
            </TableCell>
            <TableCell className="flex items-center gap-0.5">
                <Button
                    onClick={viewDetails}
                    variant="ghost"
                    className="p-1 h-min text-green-500 hover:text-green-600"
                >
                    <ReceiptText size={20} />
                </Button>
                <Button
                    onClick={editStatus}
                    variant="ghost"
                    className="p-1 h-min text-blue-500 hover:text-blue-600"
                >
                    <Pencil size={20} />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default OrderRow;
