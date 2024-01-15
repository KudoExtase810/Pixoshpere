import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import AdminFilters from "@/components/administration/AdminFilters";
import PaginationControls from "@/components/administration/PaginationControls";
import MessageRow from "@/components/administration/messages/MessageRow";
import Message from "@/models/message";
import connectDB from "@/lib/connectdb";

const Messages = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const email = searchParams.email;
    const sortBy = searchParams.sortBy || "createdAt";
    const page = parseInt(searchParams.page || "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectDB();

    const queryObj: any = {};
    if (email) {
        queryObj.label.email = { $regex: email, $options: "i" };
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }

    const messages = await Message.find<Message>(queryObj)
        .limit(limit)
        .skip(skip)
        .sort(sortObj);

    const totalDocs = await Message.countDocuments(queryObj);

    return (
        <>
            <h1 className="bmessage-b pb-2 pt-4 text-3xl font-semibold tracking-tight">
                Messages
            </h1>
            {/* <AdminFilters type="message" /> */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Sent on</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((message) => (
                            <MessageRow
                                key={message._id}
                                message={JSON.parse(JSON.stringify(message))}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationControls
                showingDocs={messages.length}
                totalDocs={totalDocs}
            />
        </>
    );
};

export default Messages;
