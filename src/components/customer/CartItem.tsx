import { CartItem, useCart } from "@/contexts/CartContext";
import BlurImage from "../BlurImage";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { formatPrice, notifyError } from "@/lib/utils";
import Image from "next/image";

interface CartItemProps {
    item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
    const { removeItem } = useCart();

    return (
        <li className="flex py-4 gap-4">
            <Image
                className="rounded-md max-h-[110px]"
                height={110}
                width={110}
                quality={100}
                alt={item.title}
                src={item.images[0].url}
            />

            <div className="flex flex-col justify-between w-full py-1">
                <div className="flex justify-between">
                    <div>
                        <h2 className="font-bold">
                            <Link href={`/products/${item.title}`}>
                                {item.title.length > 30
                                    ? item.title.slice(0, 30) + "..."
                                    : item.title}
                            </Link>
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {item.category?.label}
                        </p>
                    </div>
                    <p className="font-semibold">
                        {formatPrice(item.salePrice || item.price)}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">
                            Qty: {item.quantityInCart}
                        </p>
                        <QuantityControls item={item} />
                    </div>
                    <Button
                        onClick={() => removeItem(item._id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 w-10 h-10 p-0"
                    >
                        <Trash size={22} />
                        <span className="sr-only">Remove item from cart</span>
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;

const QuantityControls = ({ item }: { item: CartItem }) => {
    const { updateItemQuantity } = useCart();
    const decreaseQty = () => {
        if (item.quantityInCart === 1) {
            return;
        }
        updateItemQuantity(item._id, -1);
    };

    const increaseQty = () => {
        if (item.quantityInCart === item.quantity) {
            notifyError("Not enough items in stock.");
            return;
        }
        updateItemQuantity(item._id, 1);
    };

    return (
        <div className="flex items-center gap-1">
            <Button
                onClick={decreaseQty}
                variant="outline"
                className="p-0 w-6 h-6"
            >
                <Minus size={16} />
                <span className="sr-only">Decrease the quantity by 1</span>
            </Button>
            <Button
                onClick={increaseQty}
                variant="outline"
                className="p-0 w-6 h-6"
            >
                <Plus size={16} />
                <span className="sr-only">Increase the quantity by 1</span>
            </Button>
        </div>
    );
};
