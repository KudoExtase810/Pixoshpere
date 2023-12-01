"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useDrawer } from "@/contexts/DrawerContext";
import CategoryForm from "./CategoryForm";

const CategoryDrawer = () => {
    const { toggle, isOpen } = useDrawer();
    return (
        <Sheet
            open={isOpen("category")}
            onOpenChange={() => toggle("category")}
        >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription>
                    <CategoryForm toggleDrawer={() => toggle("category")} />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default CategoryDrawer;
