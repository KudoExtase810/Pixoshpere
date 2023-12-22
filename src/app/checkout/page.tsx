import CheckoutForm from "@/components/customer/checkout/CheckoutForm";
import CheckoutItems from "@/components/customer/checkout/CheckoutItems";

const Checkout = () => {
    return (
        <div className="container">
            <h1 className="styled">Checkout</h1>
            <div className="flex flex-col lg:flex-row">
                <CheckoutForm />
                <CheckoutItems />
            </div>
        </div>
    );
};

export default Checkout;
