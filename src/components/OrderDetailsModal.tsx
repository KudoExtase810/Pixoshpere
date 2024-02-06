"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useActionData } from "@/contexts/ActionContext";
import { useModal } from "@/contexts/ModalContext";
import dayjs from "dayjs";
import { Separator } from "./ui/separator";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "./ui/table";
import { formatPrice } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

const OrderDetailsModal = () => {
    const { isOpen, toggle } = useModal();
    const { actionData, setActionData } = useActionData();
    const selectedOrder = actionData as Order;

    if (!selectedOrder) return null;

    return (
        <Dialog
            open={isOpen("orderDetails")}
            onOpenChange={(isOpen) => {
                toggle("orderDetails");
                !isOpen && setTimeout(() => setActionData(null), 300);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Order details</DialogTitle>
                    <DialogDescription>
                        This is a description.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div>
                    <h4 className="uppercase">Date</h4>
                    <p>
                        {dayjs(selectedOrder.createdAt).format("DD MMM YYYY")}
                    </p>
                </div>
                <ScrollArea className="border rounded-md max-h-80  w-[90.99%]">
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedOrder.products.map((product, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">
                                        {idx + 1 >= 10
                                            ? idx + 1
                                            : `0${idx + 1}`}
                                    </TableCell>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>
                                        {formatPrice(product.price)}
                                    </TableCell>
                                    <TableCell>
                                        {product.quantityBought}
                                    </TableCell>
                                    <TableCell className="text-teal-500">
                                        {formatPrice(
                                            product.price *
                                                product.quantityBought
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
                <div className="flex mx-auto gap-8">
                    <div>
                        <h4>Payment Method</h4>
                        <p>-</p>
                    </div>
                    <div>
                        <h4>Subtotal</h4>
                        <p>{formatPrice(selectedOrder.total)}</p>
                    </div>
                    <div>
                        <h4>Discount</h4>
                        <p>{selectedOrder.appliedCoupon || "-"}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <p className="text-teal-500">
                            {formatPrice(selectedOrder.total)}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsModal;
