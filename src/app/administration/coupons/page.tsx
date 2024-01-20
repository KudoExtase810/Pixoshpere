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

const Coupons = async () => {
    await connectDB();
    const coupons = await Coupon.find<Coupon>({});
    const totalDocs = 0;
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
