import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/components/administration/PaginationControls";
import User from "@/models/user";
import UserRow from "@/components/administration/users/UserRow";
import connectDB from "@/lib/connectdb";
import UserFilters from "@/components/administration/users/UserFilters";

const Users = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const role = searchParams.role;
    const page = parseInt(searchParams.page || "1");
    const limit = 10;
    const skip = (page - 1) * limit;
    const query = searchParams.q;
    const sortBy = searchParams.sortBy;

    await connectDB();

    const queryObj: any = {};
    if (query) {
        queryObj.title = { $regex: query, $options: "i" };
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }

    const users = await User.find<User>({
        ...queryObj,
        isAdmin: role === "admin",
    })
        .limit(limit)
        .skip(skip)
        .sort(sortObj);

    const totalDocs = await User.countDocuments(queryObj);

    return (
        <>
            <h1 className="border-b pb-2 pt-6 text-4xl font-semibold">
                {role === "admin" ? "Admins" : "Customers"}
            </h1>
            <UserFilters />
            {users.length > 0 ? (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            {role === "admin" ? (
                                <TableRow>
                                    <TableHead>First name</TableHead>
                                    <TableHead>Last name</TableHead>
                                    <TableHead>Joined at</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableHead>First name</TableHead>
                                    <TableHead>Last name</TableHead>
                                    <TableHead>Joined at</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                </TableRow>
                            )}
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <UserRow
                                    key={user._id}
                                    user={JSON.parse(JSON.stringify(user))}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="flex items-center justify-center h-64">
                    No results were found.
                </p>
            )}
            <PaginationControls
                totalDocs={totalDocs}
                showingDocs={users.length}
            />
        </>
    );
};

export default Users;
