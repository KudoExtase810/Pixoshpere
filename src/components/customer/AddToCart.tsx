"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn, notifyError } from "@/lib/utils";

interface props {
    product: Product;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
    disabled?: boolean;
}

const AddToCart = ({ product, className, disabled }: props) => {
    const { inCart, addItem, getItemQuantity, updateItemQuantity } = useCart();
    const quantityInCart = getItemQuantity(product._id);

    const handleAdd = () => {
        if (quantityInCart === product.quantity) {
            notifyError("Not enough items in stock.");
            return;
        }
        if (inCart(product._id)) {
            updateItemQuantity(product._id, 1);
        } else addItem(product);
    };

    return (
        <Button
            onClick={handleAdd}
            className={cn(
                "py-6 px-8 text-base bg-teal-500 hover:bg-teal-600 text-white",
                className
            )}
        >
            {`Add to Cart (${quantityInCart})`}
        </Button>
    );
};

export default AddToCart;
