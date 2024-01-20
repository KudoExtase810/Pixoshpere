import CheckoutSection from "@/components/customer/checkout/CheckoutSection";
import User from "@/models/user";
import { getServerSession } from "@/auth/utils";
import { redirect } from "next/navigation";

const Checkout = async () => {
    const { isLoggedIn, userId } = await getServerSession();
    if (!isLoggedIn) redirect("/login");

    const user = await User.findById<User>(userId).select(
        "email firstName lastName phone"
    );

    return (
        <div className="container">
            <CheckoutSection userDetails={JSON.parse(JSON.stringify(user))} />
        </div>
    );
};

export default Checkout;
