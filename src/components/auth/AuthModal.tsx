"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Animate from "../Animate";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useModal } from "@/contexts/ModalContext";
import { useSearchParams } from "next/navigation";

type AuthView = "login" | "register";

const AuthModal = () => {
    const [currentView, setCurrentView] = useState<AuthView>("login");
    const [shouldShowAuthModal, setShouldShowAuthModal] = useState(false);

    const { isOpen, toggle } = useModal();

    const searchParams = useSearchParams();

    const toggleView = () => {
        setCurrentView(currentView === "login" ? "register" : "login");
    };

    useEffect(() => {
        setShouldShowAuthModal(searchParams.get("req-auth") === "true");
    }, []);

    return (
        <Dialog
            open={shouldShowAuthModal || isOpen("auth")}
            onOpenChange={() => {
                !shouldShowAuthModal && toggle("auth");
                setShouldShowAuthModal(false);
            }}
        >
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
