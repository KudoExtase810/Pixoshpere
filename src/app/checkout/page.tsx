import CheckoutForm from "@/components/customer/checkout/CheckoutForm";
import CheckoutItems from "@/components/customer/checkout/CheckoutItems";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Checkout = async () => {
    const session = await getServerSession();

    if (!session) redirect("/login");

    const userEmail = session.user.email;
    const user = await User.findOne<User>({ email: userEmail }).select(
        "email firstName lastName phone"
    );
    return (
        <div className="container">
            <h1 className="styled">Checkout</h1>
            <div className="flex flex-col lg:flex-row">
                <CheckoutForm userDetails={user} />
                <CheckoutItems />
            </div>
        </div>
    );
};

export default Checkout;
