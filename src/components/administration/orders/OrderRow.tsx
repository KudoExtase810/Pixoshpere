"use client";
import dayjs from "dayjs";

import { TableCell, TableRow } from "@/components/ui/table";
import { ClipboardEdit, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateTotal } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const OrderRow = ({ order }: { order: Order }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{`${order.customer.firstName} ${order.customer.lastName}`}</TableCell>
            <TableCell>
                {dayjs(order.createdAt).format("DD MMMM YYYY")}
            </TableCell>
            <TableCell>{order.paymentMethod}</TableCell>
            <TableCell>{calculateTotal(order.products)}$</TableCell>
            <TableCell>
                <Badge
                    className="capitalize"
                    variant={order.status || "default"}
                >
                    {order.status}
                </Badge>
            </TableCell>
            <TableCell className="flex items-center gap-0.5 ">
                <Button
                    variant="ghost"
                    className="p-1 h-min text-green-500 hover:text-green-600"
                >
                    <PackageSearch size={20} />
                </Button>
                <Button
                    variant="ghost"
                    className="p-1 h-min text-blue-500 hover:text-blue-600"
                >
                    <ClipboardEdit size={20} />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default OrderRow;
