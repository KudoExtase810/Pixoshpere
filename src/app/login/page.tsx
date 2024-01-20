import { getServerSession } from "@/auth/utils";
import LoginForm from "@/components/customer/LoginForm";
import { redirect } from "next/navigation";

const Login = async () => {
    const { isLoggedIn } = await getServerSession();
    if (isLoggedIn) redirect("/");

    return (
        <>
            <LoginForm />
        </>
    );
};

export default Login;
