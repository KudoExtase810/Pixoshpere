import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Filters from "@/components/administration/Filters";
import PaginationControls from "@/components/administration/PaginationControls";
import CategoryRow from "@/components/administration/categories/CategoryRow";
import axios from "axios";

const Categories = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const q = searchParams.q || "";
    const sortBy = searchParams.sortBy || "";
    const page = searchParams.page || 1;

    const { data } = (await axios.get(
        `${process.env.CLIENT_URL}/api/categories?q=${q}&sortBy=${sortBy}&page=${page}`
    )) as { data: { categories: Category[]; totalDocs: number } };

    return (
        <>
            <h1 className="border-b pb-2 pt-4 text-3xl font-semibold tracking-tight">
                Categories
            </h1>
            <Filters type="category" />
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
                        {data.categories.map((category) => (
                            <CategoryRow
                                key={category._id}
                                category={category}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationControls
                showingDocs={data.categories.length}
                totalDocs={data.totalDocs}
            />
        </>
    );
};

export default Categories;
