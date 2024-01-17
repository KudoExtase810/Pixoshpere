"use client";
import { LogOut, Moon, ShoppingBag, Sun, UserCog } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    ListItem,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useCart } from "@/contexts/CartContext";
import TopSearch from "./customer/TopSearch";
import { cn } from "@/lib/utils";
import React from "react";

const Navbar = ({
    isLoggedIn,
    isAdmin,
}: {
    isLoggedIn: boolean;
    isAdmin: boolean;
}) => {
    const { theme, setTheme } = useTheme();
    const { open: openCart, itemsCount } = useCart();
    const pathname = usePathname();
    const isAdminSide = pathname.includes("administration");

    const customerLinks = [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/products" },
        { label: "Contact Us", href: "/contact-us" },
    ];

    if (isAdmin) {
        customerLinks.push({
            label: "Administration",
            href: "/administration",
        });
    }

    const adminLinks = [
        { label: "Dashboard", href: "/administration" },
        {
            label: "Catalog",
            subLinks: [
                { label: "Products", href: "/administration/products" },
                { label: "Categories", href: "/administration/categories" },
                { label: "Coupons", href: "/administration/coupons" },
            ],
        },
        {
            label: "Users",
            subLinks: [
                {
                    label: "Customers",
                    href: "/administration/users?role=customer",
                },
                { label: "Admins", href: "/administration/users?role=admin" },
            ],
        },
        {
            label: "Engagement",
            subLinks: [
                { label: "Orders", href: "/administration/orders" },
                { label: "Messages", href: "/administration/messages" },
            ],
        },
    ];

    const relevantLinks = (
        isAdminSide ? adminLinks : customerLinks
    ) as typeof adminLinks;

    // Hide the navbar in these paths
    const hiddenNavbarPaths = ["/login", "/sign-up"];
    if (hiddenNavbarPaths.includes(pathname)) return null;

    return (
        <header className="sticky top-0 py-3.5 bg-neutral-200/60 dark:bg-black/60 backdrop-blur text-sm z-50">
            <div className="flex items-center justify-between container">
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="uppercase font-bold text-xl font-mono tracking-wider text-primary/95"
                    >
                        Pixo-Sphere
                    </Link>

                    <NavigationMenu className="max-lg:hidden">
                        <NavigationMenuList className="flex gap-4 text-zinc-500">
                            {relevantLinks.map((link) => {
                                if (!link.subLinks) {
                                    return (
                                        <NavigationMenuItem
                                            key={link.label}
                                            className={cn(
                                                "hover:text-zinc-700",
                                                link.href === pathname &&
                                                    "text-foreground"
                                            )}
                                        >
                                            <Link
                                                href={link.href}
                                                passHref
                                                legacyBehavior
                                            >
                                                <NavigationMenuLink
                                                    className={navigationMenuTriggerStyle()}
                                                >
                                                    {link.label}
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    );
                                } else {
                                    return (
                                        <NavigationMenuItem key={link.label}>
                                            <NavigationMenuTrigger>
                                                {link.label}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid gap-3 p-3 w-[340px]">
                                                    {link.subLinks.map(
                                                        (subLink) => (
                                                            <ListItem
                                                                key={
                                                                    subLink.label
                                                                }
                                                                title={
                                                                    subLink.label
                                                                }
                                                                href={
                                                                    subLink.href
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    );
                                }
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-5">
                    {!isAdminSide && <TopSearch />}
                    {!isLoggedIn && (
                        <Button asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    )}
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
                        <Button
                            variant={null}
                            className="px-2"
                            onClick={() => signOut()}
                        >
                            <LogOut />
                            <span className="sr-only">Log out</span>
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
                </div>
            </div>
        </header>
    );
};

export default Navbar;
