import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import ProductRow from "@/components/administration/products/ProductRow";

import AdminFilters from "@/components/administration/AdminFilters";
import PaginationControls from "@/components/administration/PaginationControls";
import ProductDrawer from "@/components/administration/products/ProductDrawer";
import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import Category from "@/models/category";

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const query = searchParams.q;
    const category = searchParams.category;
    const sortBy = searchParams.sortBy;
    const page = parseInt(searchParams.page || "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectDB();

    const queryObj: any = {};
    if (query) {
        queryObj.title = { $regex: query, $options: "i" };
    }

    if (category) {
        queryObj.category = category;
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }

    const products = await Product.find<Product>(queryObj)
        .limit(limit)
        .skip(skip)
        .sort(sortObj)
        .populate("category");

    const totalProducts = await Product.countDocuments(queryObj);

    const allCategories = await Category.find<Category>({}).select("label");

    return (
        <>
            <ProductDrawer allCategories={allCategories} />
            <h1 className="border-b pb-2 pt-4 text-3xl font-semibold tracking-tight">
                Products
            </h1>
            <AdminFilters type="product" />
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
                        {products.map((product) => (
                            <ProductRow
                                key={product._id}
                                product={JSON.parse(JSON.stringify(product))}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationControls
                totalDocs={totalProducts}
                showingDocs={products.length}
            />
        </>
    );
};

export default Products;
