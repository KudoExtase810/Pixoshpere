import PaginationControls from "@/components/administration/PaginationControls";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const AdminLoading = () => {
    return (
        <>
            {/* Title */}
            <Skeleton className="mb-2 mt-6 border-b h-6 w-36" />

            {/* Filters */}
            <div className="flex max-lg:flex-col-reverse max-lg:gap-4 items-center justify-between py-4">
                <Skeleton className="w-full lg:max-w-md h-9" />
                <Skeleton className="w-full lg:max-w-md h-9" />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Skeleton className="h-4 w-28" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-28" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-28" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-28" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-28" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...new Array(10)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-5 w-36" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-5 w-36" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-5 w-36" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-5 w-36" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-5 w-36" />{" "}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PaginationControls showingDocs={0} totalDocs={0} />
        </>
    );
};

export default AdminLoading;
