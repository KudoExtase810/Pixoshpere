"use client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/contexts/MobileSidebarContext";
import NavLinks from "./NavLinks";
import { usePathname } from "@/lib/navigation";

interface MobileSidebarProps {
    isAdmin: boolean;
}

const MobileSidebar = ({ isAdmin }: MobileSidebarProps) => {
    const { isOpen, toggle } = useMobileSidebar();
    const pathname = usePathname();
    const isAdminSide = pathname.includes("administration");

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent className="lg:hidden max-[500px]:px-3 min-w-[300px] md:min-w-[520px] overflow-y-auto">
                {/* <ProductSearch className="mt-6 mb-4" /> */}
                <NavLinks
                    pathname={pathname}
                    isAdmin={isAdmin}
                    isAdminSide={isAdminSide}
                />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
