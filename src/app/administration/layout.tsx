import DeleteModal from "@/components/DeleteModal";
import DrawerContextProvider from "@/contexts/DrawerContext";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DrawerContextProvider>
            <DeleteModal />
            {children}
        </DrawerContextProvider>
    );
};

export default AdminLayout;
