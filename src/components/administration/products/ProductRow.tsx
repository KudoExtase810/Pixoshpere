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

const ProductRow = ({ product }: { product: Product<Category> }) => {
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
                        <DropdownMenuLabel>
                            Choisissez une action
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default ProductRow;
