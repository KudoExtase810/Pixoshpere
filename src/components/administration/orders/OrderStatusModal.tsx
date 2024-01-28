"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useActionData } from "@/contexts/ActionContext";
import { useModal } from "@/contexts/ModalContext";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import { notifyError, notifySuccess } from "@/lib/utils";
import { useRouter } from "next/navigation";

const OrderStatusModal = () => {
    const { isOpen, toggle } = useModal();
    const { actionData, setActionData } = useActionData();
    const selectedOrder = actionData as Order;

    const router = useRouter();

    const updateStatus = async (newStatus: Order["status"]) => {
        try {
            const { data } = await axios.patch(
                `/api/orders/${selectedOrder._id}/status`,
                { newStatus }
            );
            notifySuccess(data.message);

            toggle("orderStatus");
            setActionData(null);

            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    if (!selectedOrder) return null;
    const statuses: Order["status"][] = [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "canceled",
    ];
    return (
        <Dialog
            open={isOpen("orderStatus")}
            onOpenChange={(isOpen) => {
                toggle("orderStatus");
                !isOpen && setTimeout(() => setActionData(null), 300);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Update Status (
                        <span className="text-base">Currently</span>{" "}
                        <Badge variant={selectedOrder.status}>
                            {selectedOrder.status}
                        </Badge>
                        )
                    </DialogTitle>
                </DialogHeader>

                <Select
                    onValueChange={(value: Order["status"]) =>
                        updateStatus(value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a new status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {statuses.map((status) => (
                                <SelectItem
                                    className="capitalize"
                                    key={status}
                                    value={status}
                                >
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p className="ml-auto">
                    Order by{" "}
                    <Link
                        href={`/administration/users?email=${selectedOrder.customer.email}`}
                        className="text-teal-500"
                    >{`${selectedOrder.customer.firstName} ${selectedOrder.customer.lastName}`}</Link>
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default OrderStatusModal;
