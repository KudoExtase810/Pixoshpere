import SignUpForm from "@/components/customer/SignUpForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
    const session = await getServerSession();
    if (session) redirect("/login");

    return <SignUpForm />;
};

export default SignUp;
