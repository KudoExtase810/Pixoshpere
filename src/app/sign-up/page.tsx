import SignUpForm from "@/components/customer/SignUpForm";
import { getServerSession } from "@/auth/utils";
import { redirect } from "next/navigation";

const SignUp = async () => {
    const { isLoggedIn } = await getServerSession();
    if (isLoggedIn) redirect("/");

    return <SignUpForm />;
};

export default SignUp;
