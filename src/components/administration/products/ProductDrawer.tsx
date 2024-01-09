"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import ProductForm from "@/components/administration/products/ProductForm";
import { useDrawer } from "@/contexts/DrawerContext";
import { useActionData } from "@/contexts/ActionContext";

interface props {
    allCategories: Category[];
}

const ProductDrawer = ({ allCategories }: props) => {
    const { toggle, isOpen } = useDrawer();
    const { setActionData } = useActionData();

    return (
        <Sheet
            open={isOpen("product")}
            onOpenChange={(isOpen) => {
                toggle("product");
                !isOpen && setActionData(null);
            }}
        >
            <SheetContent className="max-[500px]:px-3 min-w-[310px] md:min-w-[640px] lg:min-w-[768px] overflow-y-auto">
                <SheetHeader className="mb-4">
                    <SheetTitle>Add a new product</SheetTitle>
                    <SheetDescription>
                        Fill in your product's details.
                    </SheetDescription>
                </SheetHeader>
                <ProductForm
                    allCategories={allCategories}
                    toggleDrawer={() => toggle("product")}
                />
            </SheetContent>
        </Sheet>
    );
};

export default ProductDrawer;
