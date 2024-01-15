"use client";

import { useState, createContext, useContext } from "react";

type ActionData = User | Product | Message | Category | Order | Coupon | null;

type ActionContext = {
    actionData: ActionData;
    setActionData: React.Dispatch<React.SetStateAction<ActionData>>;
};

const ActionContext = createContext<ActionContext>({} as ActionContext);

export const useActionData = () => useContext(ActionContext);

// This will store any type of data when a modal/drawer is open,
// and should be set to null whenever that same modal/drawer is closed
const ActionContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [actionData, setActionData] = useState<ActionData>(null);

    return (
        <ActionContext.Provider value={{ actionData, setActionData }}>
            {children}
        </ActionContext.Provider>
    );
};

export default ActionContextProvider;
