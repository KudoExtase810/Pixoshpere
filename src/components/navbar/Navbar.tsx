"use client";
import { Menu, Moon, ShoppingBag, Sun } from "lucide-react";
import { Link } from "@/lib/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/lib/navigation";
import { useCart } from "@/contexts/CartContext";
import { notifyError } from "@/lib/utils";
import React from "react";
import axios from "axios";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import { useMobileSidebar } from "@/contexts/MobileSidebarContext";
import { useModal } from "@/contexts/ModalContext";

interface NavbarProps {
    isLoggedIn: boolean;
    isAdmin: boolean;
    userDetails: Pick<User, "firstName" | "lastName" | "email">;
}

const Navbar = ({ isLoggedIn, isAdmin, userDetails }: NavbarProps) => {
    const { theme, setTheme } = useTheme();
    const { open: openCart, itemsCount } = useCart();
    const { open: openMobileSidebar } = useMobileSidebar();
    const { toggle } = useModal();
    const router = useRouter();
    const pathname = usePathname();
    const isAdminSide = pathname.includes("administration");

    const signOut = async () => {
        const res = await axios.post("/api/auth/sign-out");
        if (res.status === 200) {
            router.refresh();
        } else {
            notifyError(res.data.message);
        }
    };

    const showAuthModal = () => toggle("auth");

    return (
        <header className="sticky top-0 py-3.5 bg-neutral-200/60 dark:bg-black/60 backdrop-blur text-sm z-50">
            <div className="flex items-center justify-between container">
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="uppercase font-bold text-xl font-mono tracking-wider text-primary/95"
                    >
                        MS Tech
                    </Link>
                    <div className="max-lg:hidden">
                        <NavLinks
                            pathname={pathname}
                            isAdmin={isAdmin}
                            isAdminSide={isAdminSide}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    {/* Search bar */}
                    {/* {!isAdminSide && (
                        <ProductSearch className="max-lg:hidden" />
                    )} */}
                    {/* Sign in button */}
                    {!isLoggedIn && (
                        <Button variant="action" onClick={showAuthModal}>
                            Sign In
                        </Button>
                    )}
                    {/* Theme toggle */}
                    <Button
                        variant={null}
                        className="px-2"
                        onClick={() =>
                            theme === "dark"
                                ? setTheme("light")
                                : setTheme("dark")
                        }
                    >
                        <Sun className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {isAdminSide ? (
                        <Button onClick={signOut} variant={"destructive"}>
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            variant={null}
                            className="px-2 relative"
                            onClick={openCart}
                        >
                            <span className="sr-only">Cart</span>
                            <ShoppingBag />
                            <span className="absolute right-1 bottom-0 bg-primary text-primary-foreground font-semibold w-[2ch] text-xs rounded-sm">
                                {itemsCount}
                            </span>
                        </Button>
                    )}
                    {/* Profile dropdown */}
                    {isLoggedIn && !isAdminSide && (
                        <ProfileMenu
                            userDetails={userDetails}
                            signOut={signOut}
                        />
                    )}
                    {/* Mobile sidebar */}
                    <Button
                        variant={null}
                        className="px-2 lg:hidden"
                        onClick={openMobileSidebar}
                    >
                        <Menu />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
