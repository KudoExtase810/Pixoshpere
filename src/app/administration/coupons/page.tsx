import NoResults from "@/components/administration/NoResults";
import PaginationControls from "@/components/administration/PaginationControls";
import CouponDrawer from "@/components/administration/coupons/CouponDrawer";
import CouponFilters from "@/components/administration/coupons/CouponFilters";
import CouponRow from "@/components/administration/coupons/CouponRow";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
} from "@/components/ui/table";
import connectDB from "@/lib/connectdb";
import Coupon from "@/models/coupon";

const Coupons = async ({
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
        queryObj.code = { $regex: query, $options: "i" };
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }
    await connectDB();
    const coupons = (await Coupon.find(queryObj)
        .limit(limit)
        .skip(skip)
        .sort(sortObj)
        .lean()) as Coupon[];
    const totalDocs = await Coupon.countDocuments(queryObj);
    return (
        <>
            <CouponDrawer />
            <h1 className="border-b pb-2 pt-6 text-4xl font-semibold">
                Coupons
            </h1>
            <CouponFilters />
            {coupons.length > 0 ? (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Expiration Date</TableHead>
                                <TableHead>Times Used</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map((coupon) => (
                                <CouponRow
                                    key={coupon._id}
                                    coupon={JSON.parse(JSON.stringify(coupon))}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <NoResults />
            )}
            <PaginationControls
                showingDocs={coupons.length}
                totalDocs={totalDocs}
            />
        </>
    );
};

export default Coupons;
