"use client";
import dayjs from "dayjs";

import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatPrice, notifyError } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/contexts/ModalContext";
import { useDrawer } from "@/contexts/DrawerContext";
import { useActionData } from "@/contexts/ActionContext";

const CouponRow = ({ coupon }: { coupon: Coupon }) => {
    const { toggle: toggleModal } = useModal();
    const { toggle: toggleDrawer } = useDrawer();
    const { setActionData, actionData } = useActionData();

    const handleEdit = () => {
        setActionData(coupon);
        toggleDrawer("coupon");
    };

    const handleDelete = () => {
        setActionData(coupon);
        toggleModal("delete");
    };

    const discount =
        coupon.discountType === "fixed"
            ? formatPrice(coupon.discountValue)
            : `${coupon.discountValue}%`;

    const isExpired = new Date() > new Date(coupon.expiresAt);

    return (
        <TableRow>
            <TableCell className="font-medium">{coupon.code}</TableCell>
            <TableCell>{discount}</TableCell>
            <TableCell>
                {dayjs(coupon.expiresAt).format("DD MMMM YYYY")}
            </TableCell>
            <TableCell>{coupon.timesApplied}</TableCell>

            <TableCell>
                <Badge variant={isExpired ? "canceled" : "delivered"}>
                    {isExpired ? "Expired" : "Valid"}
                </Badge>
            </TableCell>
            <TableCell className="flex items-center gap-0.5 ">
                <Button
                    onClick={handleEdit}
                    variant="ghost"
                    className="p-1 h-min text-blue-500 hover:text-blue-600"
                >
                    <Pencil size={20} />
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="ghost"
                    className="p-1 h-min text-red-500 hover:text-red-600"
                >
                    <Trash size={20} />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default CouponRow;
