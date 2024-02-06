import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/customer/profile/Sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "@/auth/utils";

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
};

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
    const { isLoggedIn } = await getServerSession();

    if (!isLoggedIn) redirect("/");

    return (
        <>
            <div className="space-y-6 p-2.5 md:p-6 lg:p-10 pb-16">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Settings
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <div className="lg:-mx-4 lg:w-1/5">
                        <Sidebar />
                    </div>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    );
}
