"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

type DrawerState = {
    cart: boolean;
    product: boolean;
    category: boolean;
};

type Drawer = keyof DrawerState;

type DrawerContext = {
    isOpen: (type: Drawer) => boolean;
    toggle: (type: Drawer) => void;
};

const DrawerContext = createContext<DrawerContext>({} as DrawerContext);

export const useDrawer = () => useContext(DrawerContext);

const DrawerContextProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const [drawerState, setDrawerState] = useState<DrawerState>({
        cart: false,
        product: false,
        category: false,
    });

    function toggle(type: Drawer) {
        setDrawerState((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    }

    function isOpen(type: Drawer) {
        return drawerState[type];
    }

    useEffect(() => {
        setDrawerState({
            cart: false,
            product: false,
            category: false,
        });
    }, [pathname]);

    return (
        <DrawerContext.Provider value={{ toggle, isOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};

export default DrawerContextProvider;
