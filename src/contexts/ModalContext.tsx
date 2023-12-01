"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

type ModalState = {
    delete: boolean;
};

type Modal = keyof ModalState;

type ModalContext = {
    isOpen: (type: Modal) => boolean;
    toggle: (type: Modal) => void;
};

const ModalContext = createContext<ModalContext>({} as ModalContext);

export const useModal = () => useContext(ModalContext);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const [modalState, setModalState] = useState<ModalState>({
        delete: false,
    });

    function toggle(type: Modal) {
        setModalState((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    }

    function isOpen(type: Modal) {
        return modalState[type];
    }

    useEffect(() => {
        setModalState({
            delete: false,
        });
    }, [pathname]);

    return (
        <ModalContext.Provider value={{ toggle, isOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
