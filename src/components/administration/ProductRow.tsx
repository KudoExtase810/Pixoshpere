import { TableCell, TableRow } from "@/components/ui/table";

const ProductRow = ({ invoice }: any) => {
    return (
        <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
        </TableRow>
    );
};

export default ProductRow;
