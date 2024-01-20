import ContactForm from "@/components/customer/contact-us/ContactForm";
import FAQ from "@/components/customer/contact-us/FAQ";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import React from "react";

const ContactUs = async () => {
    const session = await getServerSession();

    const userEmail = session?.user?.email;
    const user = await User.findOne<User>({ email: userEmail }).select(
        "email firstName lastName phone"
    );
    return (
        <div className="container">
            <FAQ />
            <ContactForm userDetails={JSON.parse(JSON.stringify(user))} />
        </div>
    );
};

export default ContactUs;
