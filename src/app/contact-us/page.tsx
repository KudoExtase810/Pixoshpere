import ContactForm from "@/components/customer/contact-us/ContactForm";
import User from "@/models/user";
import { getServerSession } from "@/auth/utils";
import { redirect } from "next/navigation";

const ContactUs = async () => {
    const { isLoggedIn, userId } = await getServerSession();
    if (!isLoggedIn) redirect("/login");

    const user = await User.findById<User>(userId).select(
        "email firstName lastName phone"
    );
    return (
        <div className="container">
            <ContactForm userDetails={JSON.parse(JSON.stringify(user))} />
        </div>
    );
};

export default ContactUs;
