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
import { useActionData } from "@/contexts/ActionContext";

const CategoryDrawer = () => {
    const { toggle, isOpen } = useDrawer();
    const { setActionData } = useActionData();

    return (
        <Sheet
            open={isOpen("category")}
            onOpenChange={(isOpen) => {
                toggle("category");
                !isOpen && setActionData(null);
            }}
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
