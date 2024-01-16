"use client";

import BlurImage from "@/components/BlurImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, notifySuccess } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CheckoutItems = () => {
    const { cartItems } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [tax, setTax] = useState(0);

    const total = subTotal + shippingCost + tax;

    const applyCoupon = () => {
        notifySuccess("Coupon applied!");
    };

    return (
        <section className="w-full lg:w-1/2 lg:p-4 pr-0 pb-6">
            <ul className="divide-y bordesr-y mb-4">
                {cartItems.map((item) => (
                    <li key={item._id} className="flex py-4 gap-4">
                        <Image
                            className="rounded-md"
                            height={110}
                            width={110}
                            quality={100}
                            unoptimized
                            alt={item.title}
                            src={item.images[0].url}
                        />
                        <div className="flex flex-col justify-between w-full py-1">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="font-bold">
                                        <Link
                                            href={`/products/${item.slug}`}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    </h2>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                        {item.category.label}
                                    </p>
                                </div>
                                <p className="font-semibold">
                                    {formatPrice(item.salePrice || item.price)}
                                </p>
                            </div>

                            <p className="font-semibold">
                                Qty: {item.quantityInCart}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="space-y-2">
                <Label htmlFor="coupon">Add a discount code</Label>
                <div className="flex gap-1.5 items-center">
                    <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        id="coupon"
                    />
                    <Button onClick={applyCoupon}>Apply</Button>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="flex justify-between">
                <p>Shipping cost</p>
                <span>{formatPrice(shippingCost)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
                <p>
                    <b>Total price</b> includes {formatPrice(tax)} tax
                </p>
                <span>{formatPrice(total)}</span>
            </div>
        </section>
    );
};

export default CheckoutItems;
