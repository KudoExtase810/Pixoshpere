"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import Animate from "../Animate";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useModal } from "@/contexts/ModalContext";

type AuthView = "login" | "register";

const AuthModal = () => {
    const [currentView, setCurrentView] = useState<AuthView>("login");

    const toggleView = () => {
        setCurrentView(currentView === "login" ? "register" : "login");
    };

    const { isOpen, toggle } = useModal();
    return (
        <Dialog open={isOpen("auth")} onOpenChange={() => toggle("auth")}>
            <DialogContent>
                <Animate>
                    {currentView === "login" ? (
                        <LoginForm toggleView={toggleView} />
                    ) : (
                        <SignUpForm toggleView={toggleView} />
                    )}
                </Animate>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
