"use client";

import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutItems from "./CheckoutItems";

interface CheckoutSectionProps {
    userDetails: User;
}

const CheckoutSection = ({ userDetails }: CheckoutSectionProps) => {
    const [subTotal, setSubTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [tax, setTax] = useState(0);

    const total = subTotal + shippingCost + tax;
    return (
        <>
            <h1 className="styled">Checkout</h1>
            <div className="flex flex-col lg:flex-row">
                <CheckoutForm
                    orderData={{ subTotal, shippingCost, tax, total }}
                    userDetails={userDetails}
                />
                <CheckoutItems
                    orderData={{ subTotal, shippingCost, tax, total }}
                />
            </div>
        </>
    );
};

export default CheckoutSection;
