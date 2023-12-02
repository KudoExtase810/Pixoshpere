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
    const { toggle, isOpen } = useCart();

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
                <div className="mt-6">
                    <ul className="divide-y border-y">
                        {[1, 2, 3].map((item) => (
                            <li className="flex py-4 gap-4">
                                <div className="w-32">
                                    <BlurImage
                                        alt="f"
                                        src="https://res.cloudinary.com/duqkgxds7/image/upload/v1701435505/kvzetrdqjwkvi64cwwvs.jpg"
                                    />
                                </div>
                                <div className="flex flex-col justify-between w-full py-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <h2 className="font-bold">
                                                <Link href={"/"}>
                                                    Saleor Card
                                                </Link>
                                            </h2>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                                Gift cards
                                            </p>
                                        </div>
                                        <p className="font-semibold">$50.00</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Qty: 1</p>
                                        <Button
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
                    <div className="mt-12 flex justify-between items-center bg-accent/40 rounded-md border p-5">
                        <div>
                            <p className="font-semibold mb-1.5">Your total</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                The total may change in the next step.
                            </p>
                        </div>
                        <span className="font-medium">$68.00</span>
                    </div>
                    <Button
                        className="mt-8 w-full py-6 font-semibold text-[15px]"
                        asChild
                    >
                        <Link href="/checkout">Checkout</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
