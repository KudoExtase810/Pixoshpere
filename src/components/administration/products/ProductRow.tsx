"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useDrawer } from "@/contexts/DrawerContext";
import { useActionData } from "@/contexts/ActionContext";

const ProductRow = ({ product }: { product: Product<Category> }) => {
    const { toggle: toggleModal } = useModal();
    const { toggle: toggleDrawer } = useDrawer();
    const { setActionData } = useActionData();
    return (
        <TableRow>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.category.label}</TableCell>
            <TableCell>{product.salePrice || product.price}</TableCell>
            <TableCell className="text-rights">{product.sales}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button>
                            <MoreHorizontal size={20} className="" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuLabel>Choose an action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onSelect={() => {
                                setActionData(product);
                                toggleDrawer("product");
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => {
                                setActionData(product);
                                toggleModal("delete");
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default ProductRow;
