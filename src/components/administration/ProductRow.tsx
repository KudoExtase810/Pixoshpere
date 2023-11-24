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
import { MoreHorizontal, MoreVertical } from "lucide-react";

const ProductRow = ({ invoice }: any) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-rights">{invoice.totalAmount}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal size={20} className="ml-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="ml-3">
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
