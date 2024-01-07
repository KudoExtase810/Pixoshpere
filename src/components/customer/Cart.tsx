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

const Cart = () => {
    const { toggle, isOpen, cartItems, removeItem, total, isEmpty } = useCart();

    // const handleCheckout = async () => {
    //     setIsRedirecting(true);
    //     const checkedoutItems = cartItems.map((item) => ({
    //         _id: item._id,
    //         quantity: item.quantity,
    //     }));

    //     const response = await fetch("/api/checkout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ checkedoutItems }),
    //     });
    //     const data = await response.json();
    //     const { token } = data;
    //     setIsRedirecting(false);
    //     router.push(`/checkout/${token}`);
    // };

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent className="max-[500px]:px-3 min-w-[300px] md:min-w-[520px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Your Shopping Cart</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription>
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
                    <div className="mt-6">
                        <p className="text-center">
                            Your cart is currently empty.
                        </p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
