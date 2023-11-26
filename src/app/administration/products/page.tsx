import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import ProductRow from "@/components/administration/products/ProductRow";

import Filters from "@/components/administration/Filters";
import PaginationControls from "@/components/administration/PaginationControls";
import axios from "axios";

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const q = searchParams.q || "";
    const sortBy = searchParams.sortBy || "";
    const page = searchParams.page || 1;

    const { data } = (await axios.get(
        `${process.env.CLIENT_URL}/api/products?q=${q}&sortBy=${sortBy}&page=${page}`
    )) as { data: { products: Product<Category>[]; totalDocs: number } };

    return (
        <>
            <h1 className="border-b pb-2 pt-4 text-3xl font-semibold tracking-tight">
                Products
            </h1>
            <Filters type="product" />
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Sales</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.products.map((product) => (
                            <ProductRow key={product._id} product={product} />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationControls
                totalDocs={data.totalDocs}
                showingDocs={data.products.length}
            />
        </>
    );
};

export default Products;
