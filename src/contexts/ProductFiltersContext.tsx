"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

type ProductFiltersContext = {
    open: () => void;
    close: () => void;
    isOpen: boolean;
    toggle: () => void;
};

const ProductFiltersContext = createContext<ProductFiltersContext>(
    {} as ProductFiltersContext
);

export const useProductFilters = () => useContext(ProductFiltersContext);

const ProductFiltersContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();

    const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

    const close = () => setShowFiltersDrawer(false);
    const open = () => setShowFiltersDrawer(true);
    const toggle = () => setShowFiltersDrawer((prev) => !prev);

    useEffect(close, [pathname]);

    return (
        <ProductFiltersContext.Provider
            value={{
                close,
                open,
                isOpen: showFiltersDrawer,
                toggle,
            }}
        >
            {children}
        </ProductFiltersContext.Provider>
    );
};

export default ProductFiltersContextProvider;
