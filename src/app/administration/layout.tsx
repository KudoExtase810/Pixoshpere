import DeleteModal from "@/components/DeleteModal";
import DrawerContextProvider from "@/contexts/DrawerContext";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession();

    if (!session) redirect("/login");

    // if (!session.user.isAdmin) redirect("/");
    console.log(session);

    return (
        <DrawerContextProvider>
            <DeleteModal />
            <div className="container">{children}</div>
        </DrawerContextProvider>
    );
};

export default AdminLayout;
