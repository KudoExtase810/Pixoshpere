"use client";
import { LogOut, Moon, Search, ShoppingBag, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useDrawer } from "@/contexts/DrawerContext";

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const { toggle } = useDrawer();

    const pathname = usePathname();
    const isAdmin = pathname.includes("administration");

    const customerLinks = [
        { label: "All", href: "/" },
        { label: "Apparel", href: "/" },
        { label: "Accessories", href: "/" },
    ];

    const adminLinks = [
        { label: "Dashboard", href: "/administration" },
        { label: "Products", href: "/administration/products" },
        { label: "Orders", href: "/administration/orders" },
    ];

    const relevantLinks = isAdmin ? adminLinks : customerLinks;

    return (
        <header className="sticky top-0 py-3.5 bg-neutral-200/50 backdrop-blur text-sm">
            <div className="flex items-center justify-between container">
                <nav className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="uppercase font-bold text-xl font-mono tracking-wider text-zinc-800"
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
                <div className="flex items-center gap-6">
                    {!isAdmin && (
                        <form className="relative">
                            <Input
                                placeholder="Search for products..."
                                type="text"
                                className="bg-white w-80"
                            />
                            <Search
                                size={19}
                                className="absolute top-2.5 right-2.5 text-zinc-700"
                            />
                        </form>
                    )}
                    <Button
                        variant={null}
                        className="px-2 "
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
                            className="px-2"
                            onClick={() => toggle("cart")}
                        >
                            <ShoppingBag />
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
