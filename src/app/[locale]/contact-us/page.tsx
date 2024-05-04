import ContactForm from "@/components/customer/contact-us/ContactForm";
import User from "@/models/user";
import { getServerSession } from "@/auth/utils";

const ContactUs = async () => {
    const { isLoggedIn, userId } = await getServerSession();
    let user = { email: "", firstName: "", lastName: "", phone: "" };
    if (isLoggedIn) {
        user = await User.findById<User>(userId).select(
            "email firstName lastName phone"
        );
    }
    return (
        <div className="container">
            <ContactForm
                userDetails={JSON.parse(JSON.stringify(user))}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
};

export default ContactUs;
