import LoginForm from "@/components/customer/LoginForm";
import SimilarProducts from "@/components/customer/SimilarProducts";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Login = async () => {
    if (0) redirect("/");

    return (
        <>
            <LoginForm />
        </>
    );
};

export default Login;
