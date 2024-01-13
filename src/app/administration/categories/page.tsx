import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import AdminFilters from "@/components/administration/AdminFilters";
import PaginationControls from "@/components/administration/PaginationControls";
import CategoryRow from "@/components/administration/categories/CategoryRow";
import CategoryDrawer from "@/components/administration/categories/CategoryDrawer";
import Category from "@/models/category";
import connectDB from "@/lib/connectdb";

const Categories = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const query = searchParams.q;
    const sortBy = searchParams.sortBy || "createdAt";
    const page = parseInt(searchParams.page || "1");

    const limit = 10;
    const skip = (page - 1) * limit;

    await connectDB();

    const queryObj: any = {};
    if (query) {
        queryObj.label = { $regex: query, $options: "i" };
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }

    // we're using aggregate because it allows us to count-
    // the products in each category, without an additional query and logic
    const categories = await Category.aggregate<Category>([
        {
            $match: queryObj,
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products",
            },
        },
        {
            $addFields: {
                productCount: { $size: "$products" },
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
        {
            $sort: sortObj,
        },
    ]);

    const totalDocs = await Category.countDocuments(queryObj);

    return (
        <>
            <CategoryDrawer />
            <h1 className="border-b pb-2 pt-4 text-3xl font-semibold tracking-tight">
                Categories
            </h1>
            <AdminFilters type="category" />
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead>Added On</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <CategoryRow
                                key={category._id}
                                category={JSON.parse(JSON.stringify(category))}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationControls
                showingDocs={categories.length}
                totalDocs={totalDocs}
            />
        </>
    );
};

export default Categories;
