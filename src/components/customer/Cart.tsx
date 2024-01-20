"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";
import { ShoppingBasket } from "lucide-react";

const Cart = () => {
    const { toggle, isOpen, cartItems, removeItem, total, isEmpty } = useCart();

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent className="max-[500px]:px-3 min-w-[300px] md:min-w-[520px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Your Shopping Cart</SheetTitle>
                    {/* <SheetDescription>
                        You can easily 
                    </SheetDescription> */}
                </SheetHeader>
                {!isEmpty ? (
                    <div className="mt-6">
                        <ul className="divide-y border-y">
                            {cartItems.map((item) => (
                                <CartItem key={item._id} item={item} />
                            ))}
                        </ul>
                        <div className="mt-12 flex justify-between items-center bg-accent/60 dark:bg-accent/40 rounded-md border p-5">
                            <div>
                                <p className="font-semibold mb-1.5">
                                    Your total
                                </p>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    The total may change in the next step.
                                </p>
                            </div>
                            <span className="font-medium">
                                {formatPrice(total)}
                            </span>
                        </div>
                        <Button
                            asChild
                            className="mt-8 w-full py-6 font-semibold text-base"
                        >
                            <Link href="/checkout">Checkout</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <ShoppingBasket size={124} strokeWidth={1.8} />
                        <p className="text-center text-xl">
                            Your cart is currently empty. You can view our
                            products from{" "}
                            <Link href="/products" className="text-cyan-500">
                                here
                            </Link>
                            .
                        </p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
