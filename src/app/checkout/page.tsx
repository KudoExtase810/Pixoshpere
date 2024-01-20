import CheckoutSection from "@/components/customer/checkout/CheckoutSection";
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
            <CheckoutSection userDetails={JSON.parse(JSON.stringify(user))} />
        </div>
    );
};

export default Checkout;
