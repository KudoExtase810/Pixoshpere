import { getServerSession } from "@/auth/utils";
import DeleteModal from "@/components/DeleteModal";
import DrawerContextProvider from "@/contexts/DrawerContext";

import { notFound } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn, isAdmin } = await getServerSession();
    if (!isLoggedIn || !isAdmin) notFound();

    return (
        <DrawerContextProvider>
            <DeleteModal />
            <div className="container">{children}</div>
        </DrawerContextProvider>
    );
};

export default AdminLayout;
