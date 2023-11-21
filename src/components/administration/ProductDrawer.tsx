import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ProductForm from "@/components/administration/ProductForm";

const ProductDrawer = () => {
    return (
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent className="md:min-w-[640px] lg:min-w-[768px] overflow-y-auto">
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
