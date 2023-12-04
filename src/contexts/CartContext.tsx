"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { notifyError, notifySuccess } from "@/lib/utils";

type CartContext = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    cartItems: CartItem[];
    addItem: (item: Product) => void;
    removeItem: (itemID: string) => void;
    emptyCart: () => void;
    isEmpty: boolean;
    itemsCount: number;
    inCart: (itemID: string) => boolean;
    updateItemQuantity: (itemID: string, by: 1 | -1) => void;
    total: number;
};

type CartItem = Product & { quantityInCart: number };

const CartContext = createContext<CartContext>({} as CartContext);

export const useCart = () => useContext(CartContext);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Cart modal
    const [showCart, setShowCart] = useState(false);

    const close = () => setShowCart(false);
    const open = () => setShowCart(true);
    const toggle = () => setShowCart((prev) => !prev);

    useEffect(close, [pathname]);

    // Cart logic
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const inCart = (itemID: string) => {
        return cartItems.findIndex((item) => item._id === itemID) !== -1;
    };

    const addItem = (item: Product) => {
        if (inCart(item._id)) {
            notifyError(
                "This product is already in cart. You may add more from there."
            );
            return;
        }
        setCartItems([...cartItems, { ...item, quantityInCart: 0 }]);
        notifySuccess("Item added to cart.");
    };

    const removeItem = (itemID: string) => {
        setCartItems([...cartItems].filter((item) => item._id !== itemID));
        notifySuccess("Item removed from cart.");
    };

    const emptyCart = () => {
        setCartItems([]);
        notifySuccess("Your cart has been emptied.");
    };

    const isEmpty = cartItems.length === 0;

    const itemsCount = cartItems.length;

    const getTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            const currentItemPrice = item.salePrice || item.price;
            total += currentItemPrice;
        });
        return total;
    };

    const updateItemQuantity = (itemID: string, by: 1 | -1) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item._id === itemID
                    ? { ...item, quantityInCart: item.quantityInCart + by }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                toggle,
                close,
                open,
                isOpen: showCart,
                cartItems,
                addItem,
                removeItem,
                emptyCart,
                isEmpty,
                inCart,
                itemsCount,
                updateItemQuantity,
                total: getTotal(),
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
