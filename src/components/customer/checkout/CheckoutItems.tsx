import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, notifyError, notifySuccess } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import React, { useState } from "react";

interface CheckoutItemsProps {
    orderData: {
        subTotal: number;
        shippingCost: number;
        tax: number;
        total: number;
    };
    coupon: string | undefined;
    setCoupon: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CheckoutItems = ({
    orderData,
    coupon,
    setCoupon,
}: CheckoutItemsProps) => {
    const { cartItems } = useCart();

    const applyCoupon = () => {
        notifyError("This feature is disabled for now.");
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
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        id="coupon"
                    />
                    <Button onClick={applyCoupon}>Apply</Button>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <span>{formatPrice(orderData.subTotal)}</span>
            </div>
            <div className="flex justify-between">
                <p>Shipping cost</p>
                <span>{formatPrice(orderData.shippingCost)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
                <p>
                    <b>Total price</b> includes {formatPrice(orderData.tax)} tax
                </p>
                <span>{formatPrice(orderData.total)}</span>
            </div>
        </section>
    );
};

export default CheckoutItems;
