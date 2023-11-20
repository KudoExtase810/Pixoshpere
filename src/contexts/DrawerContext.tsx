"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

type DrawerContext = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

const DrawerContext = createContext<DrawerContext>({} as DrawerContext);

export const useDrawer = () => useContext(DrawerContext);

const DrawerContextProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const [showDrawer, setShowDrawer] = useState(false);
    const open = () => setShowDrawer(true);
    const close = () => setShowDrawer(false);

    useEffect(close, [pathname]);

    return (
        <DrawerContext.Provider value={{ open, close, isOpen: showDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export default DrawerContextProvider;
