"use client";
import dayjs from "dayjs";

import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import { useDrawer } from "@/contexts/DrawerContext";
import { useActionData } from "@/contexts/ActionContext";

const CategoryRow = ({ category }: { category: Category }) => {
    const { toggle: toggleModal } = useModal();
    const { toggle: toggleDrawer } = useDrawer();
    const { setActionData } = useActionData();

    const handleEdit = () => {
        setActionData(category);
        toggleDrawer("category");
    };

    const handleDelete = () => {
        setActionData(category);
        toggleModal("delete");
    };
    return (
        <TableRow>
            <TableCell className="font-medium">{category.label}</TableCell>
            <TableCell>{category.productCount}</TableCell>
            <TableCell>
                {dayjs(category.createdAt).format("DD MMMM YYYY")}
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

export default CategoryRow;
