"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useDrawer } from "@/contexts/DrawerContext";
import CouponForm from "./CouponForm";

const CouponDrawer = () => {
    const { toggle, isOpen } = useDrawer();
    return (
        <Sheet open={isOpen("coupon")} onOpenChange={() => toggle("coupon")}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription>
                    <CouponForm toggleDrawer={() => toggle("coupon")} />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default CouponDrawer;
