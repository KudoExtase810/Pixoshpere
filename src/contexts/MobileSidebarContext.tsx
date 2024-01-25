"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

type MobileSidebarContext = {
    open: () => void;
    close: () => void;
    isOpen: boolean;
    toggle: () => void;
};

const MobileSidebarContext = createContext<MobileSidebarContext>(
    {} as MobileSidebarContext
);

export const useMobileSidebar = () => useContext(MobileSidebarContext);

const MobileSidebarContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();

    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const close = () => setShowMobileSidebar(false);
    const open = () => setShowMobileSidebar(true);
    const toggle = () => setShowMobileSidebar((prev) => !prev);

    useEffect(close, [pathname]);

    return (
        <MobileSidebarContext.Provider
            value={{
                close,
                open,
                isOpen: showMobileSidebar,
                toggle,
            }}
        >
            {children}
        </MobileSidebarContext.Provider>
    );
};

export default MobileSidebarContextProvider;
