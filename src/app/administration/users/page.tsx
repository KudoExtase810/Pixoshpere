import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import AdminFilters from "@/components/administration/AdminFilters";
import PaginationControls from "@/components/administration/PaginationControls";
import User from "@/models/user";
import UserRow from "@/components/administration/users/UserRow";
import connectDB from "@/lib/connectdb";

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
            <h1 className="border-b pb-2 pt-4 text-3xl font-semibold tracking-tight">
                {role === "admin" ? "Admins" : "Customers"}
            </h1>
            <AdminFilters type="user" />
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
            <PaginationControls
                totalDocs={totalDocs}
                showingDocs={users.length}
            />
        </>
    );
};

export default Users;
