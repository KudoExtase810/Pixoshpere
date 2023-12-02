"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

type CartContext = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

const CartContext = createContext<CartContext>({} as CartContext);

export const useCart = () => useContext(CartContext);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const [showCart, setShowCart] = useState(false);

    const close = () => setShowCart(false);
    const open = () => setShowCart(true);
    const toggle = () => setShowCart((prev) => !prev);

    useEffect(close, [pathname]);

    return (
        <CartContext.Provider value={{ toggle, close, open, isOpen: showCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
