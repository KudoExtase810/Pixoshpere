"use client";
import dayjs from "dayjs";

import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const CouponRow = ({ coupon }: { coupon: Coupon }) => {
    const discount =
        coupon.discountType === "fixed"
            ? formatPrice(coupon.discountValue)
            : `${coupon.discountValue}%`;

    const isExpired = new Date() > new Date(coupon.expiresAt);

    const togglePublicity = async () => {
        // TODO:
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{coupon.code}</TableCell>
            <TableCell>{discount}</TableCell>
            <TableCell>
                {dayjs(coupon.expiresAt).format("DD MMMM YYYY")}
            </TableCell>
            <TableCell>{coupon.timesApplied}</TableCell>
            <TableCell>
                <Switch defaultChecked={coupon.isPublished} />
            </TableCell>
            <TableCell>
                <Badge variant={isExpired ? "canceled" : "delivered"}>
                    {isExpired ? "Expired" : "Valid"}
                </Badge>
            </TableCell>
            <TableCell className="flex items-center gap-0.5 ">
                <Button
                    variant="ghost"
                    className="p-1 h-min text-blue-500 hover:text-blue-600"
                >
                    <Pencil size={20} />
                </Button>
                <Button
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
