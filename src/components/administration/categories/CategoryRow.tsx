"use client";
import dayjs from "dayjs";

import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const CategoryRow = ({ category }: { category: Category }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{category.label}</TableCell>
            <TableCell>{category.productCount}</TableCell>
            <TableCell>
                {dayjs(category.createdAt).format("DD MMMM YYYY")}
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

export default CategoryRow;
