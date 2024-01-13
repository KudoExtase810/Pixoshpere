"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useDrawer } from "@/contexts/DrawerContext";
import { useActionData } from "@/contexts/ActionContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const ProductRow = ({ product }: { product: Product }) => {
    const { toggle: toggleModal } = useModal();
    const { toggle: toggleDrawer } = useDrawer();
    const { setActionData } = useActionData();

    const handleEdit = () => {
        setActionData(product);
        toggleDrawer("product");
    };

    const handleDelete = () => {
        setActionData(product);
        toggleModal("delete");
    };

    return (
        <TableRow>
            <TableCell className="font-medium">
                <Link href={`/products/${product.slug}`} target="_blank">
                    {product.title}
                </Link>
            </TableCell>
            <TableCell>{product.category.label}</TableCell>
            <TableCell>
                {formatPrice(product.salePrice || product.price)}
            </TableCell>
            <TableCell>{product.sales}</TableCell>
            <TableCell>{product.quantity}</TableCell>
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

export default ProductRow;
