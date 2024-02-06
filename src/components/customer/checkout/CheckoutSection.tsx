"use client";

import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutItems from "./CheckoutItems";
import { useCart } from "@/contexts/CartContext";

interface CheckoutSectionProps {
    userDetails: User;
}

const CheckoutSection = ({ userDetails }: CheckoutSectionProps) => {
    const { total: subTotal } = useCart();
    const [shippingCost, setShippingCost] = useState(0);
    const [tax, setTax] = useState(0);
    const [coupon, setCoupon] = useState<string>();

    const total = subTotal + shippingCost + tax;
    return (
        <>
            <h1 className="pb-4 pt-6 text-4xl font-semibold">Checkout</h1>
            <div className="flex flex-col lg:flex-row">
                <CheckoutForm
                    orderData={{
                        subTotal,
                        shippingCost,
                        tax,
                        total,
                    }}
                    coupon={coupon}
                    userDetails={userDetails}
                />
                <CheckoutItems
                    orderData={{ subTotal, shippingCost, tax, total }}
                    coupon={coupon}
                    setCoupon={setCoupon}
                />
            </div>
        </>
    );
};

export default CheckoutSection;
