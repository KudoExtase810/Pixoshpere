"use client";
import { LogOut, Moon, ShoppingBag, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useCart } from "@/contexts/CartContext";
import TopSearch from "./customer/TopSearch";

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const { open: openCart, itemsCount } = useCart();

    const pathname = usePathname();
    const isAdmin = pathname.includes("administration");

    const customerLinks = [
        { label: "All", href: "/products" },
        { label: "Apparel", href: "/" },
        { label: "Accessories", href: "/" },
    ];

    const adminLinks = [
        { label: "Dashboard", href: "/administration" },
        { label: "Products", href: "/administration/products" },
        { label: "Orders", href: "/administration/orders" },
        { label: "Categories", href: "/administration/categories" },
    ];

    const relevantLinks = isAdmin ? adminLinks : customerLinks;

    // Hide the navbar in these paths
    const hiddenNavbarPaths = ["/login", "/sign-up"];
    if (hiddenNavbarPaths.includes(pathname)) return null;

    return (
        <header className="sticky top-0 py-3.5 bg-neutral-200/60 dark:bg-black/60 backdrop-blur text-sm z-50">
            <div className="flex items-center justify-between container">
                <nav className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="uppercase font-bold text-xl font-mono tracking-wider text-primary/95"
                    >
                        MS Tech
                    </Link>

                    <ul className="flex gap-4 text-zinc-500 font-semibold">
                        {relevantLinks.map((link) => (
                            <li
                                key={link.label}
                                className="hover:text-zinc-700"
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-5">
                    {!isAdmin && <TopSearch />}
                    <Button asChild>
                        <Link href="/login">Sign In</Link>
                    </Button>
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
                    {isAdmin ? (
                        <Button
                            variant={null}
                            className="px-2"
                            onClick={() => signOut()}
                        >
                            <LogOut />
                        </Button>
                    ) : (
                        <Button
                            variant={null}
                            className="px-2 relative"
                            onClick={openCart}
                        >
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
