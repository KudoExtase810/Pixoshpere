"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useDrawer } from "@/contexts/DrawerContext";

const Cart = () => {
    const { toggle, isOpen } = useDrawer();
    return (
        <Sheet open={isOpen("cart")} onOpenChange={() => toggle("cart")}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
