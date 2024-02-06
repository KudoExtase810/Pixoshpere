"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { ShoppingBasket } from "lucide-react";

import { useCart } from "@/contexts/CartContext";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";

const Cart = () => {
    const { toggle, isOpen, cartItems, total, isEmpty } = useCart();

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent className="max-[500px]:px-3 min-w-[95%] sm:min-w-[85%] md:min-w-[520px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Your Shopping Cart</SheetTitle>
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
                            <span className="font-medium max-sm:text-sm">
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
                    <div className="mt-6 flex flex-col items-center gap-2 text-center">
                        <ShoppingBasket size={124} strokeWidth={1.8} />
                        <p className=" text-xl">Your cart is currently empty</p>
                        <p>
                            You can view our products from{" "}
                            <Link
                                href="/products"
                                className="text-teal-500 hover:text-teal-600"
                            >
                                here
                            </Link>
                        </p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
