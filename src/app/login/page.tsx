import LoginForm from "@/components/customer/LoginForm";
import SimilarProducts from "@/components/customer/SimilarProducts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Login = async () => {
    const session = await getServerSession();
    if (session) redirect("/");

    return (
        <>
            <LoginForm />
        </>
    );
};

export default Login;
