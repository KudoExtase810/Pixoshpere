"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import BlurImage from "./BlurImage";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Link from "next/link";

const Cart = () => {
    const { toggle, isOpen, cartItems, removeItem, total, isEmpty } = useCart();

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
                                <li key={item._id} className="flex py-4 gap-4">
                                    <div className="w-32">
                                        <BlurImage
                                            alt={item.title}
                                            src={item.images[0].url}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between w-full py-1">
                                        <div className="flex justify-between">
                                            <div>
                                                <h2 className="font-bold">
                                                    <Link href={"/"}>
                                                        {item.title}
                                                    </Link>
                                                </h2>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                                    {item.category.label}
                                                </p>
                                            </div>
                                            <p className="font-semibold">
                                                $
                                                {(
                                                    item.salePrice || item.price
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">
                                                Qty: {item.quantityInCart}
                                            </p>
                                            <Button
                                                onClick={() =>
                                                    removeItem(item._id)
                                                }
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash size={22} />
                                                <span className="sr-only">
                                                    Remove item from cart
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </li>
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
                                ${total.toFixed(2)}
                            </span>
                        </div>
                        <Button
                            className="mt-8 w-full py-6 font-semibold text-base"
                            asChild
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
