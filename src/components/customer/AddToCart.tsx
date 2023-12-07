"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface props {
    product: Product;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

const AddToCart = ({ product, className }: props) => {
    const { inCart, addItem } = useCart();

    const shouldDisable = product.quantity === 0 || inCart(product._id);

    return (
        <Button
            onClick={() => addItem(product)}
            className={cn("py-6 px-8 text-base", className)}
            disabled={shouldDisable}
        >
            {inCart(product._id) ? "Already in Cart" : "Add to Cart"}
        </Button>
    );
};

export default AddToCart;
