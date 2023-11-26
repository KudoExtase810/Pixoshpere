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

const ProductDrawer = () => {
    const { toggle, isOpen } = useDrawer();

    return (
        <Sheet open={isOpen("product")} onOpenChange={() => toggle("product")}>
            <SheetContent className="max-[500px]:px-3 min-w-[310px] md:min-w-[640px] lg:min-w-[768px] overflow-y-auto">
                <SheetHeader className="mb-4">
                    <SheetTitle>Ajouter un produit</SheetTitle>
                    <SheetDescription>
                        Veuillez remplir le formulaire ci-dessous.
                    </SheetDescription>
                </SheetHeader>
                <ProductForm />
            </SheetContent>
        </Sheet>
    );
};

export default ProductDrawer;
