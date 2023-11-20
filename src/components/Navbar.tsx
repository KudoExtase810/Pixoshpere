"use client";
import { Moon, Search, ShoppingCart, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = ({ isAdmin }: { isAdmin?: boolean }) => {
    const { theme, setTheme } = useTheme();

    const links = [
        { label: "All", href: "/" },
        { label: "Apparel", href: "/" },
        { label: "Accessories", href: "/" },
    ];
    return (
        <header className="sticky top-0 py-3.5 bg-neutral-200/50 backdrop-blur text-sm">
            <div className="flex items-center justify-between container">
                <div className="flex items-center gap-8">
                    <div className="uppercase font-bold text-xl font-mono tracking-wider text-zinc-800">
                        MS Tech
                    </div>
                    <nav>
                        <ul className="flex gap-4 text-zinc-500 font-semibold">
                            {links.map((link) => (
                                <li
                                    key={link.label}
                                    className="hover:text-zinc-700"
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <form className="relative" hidden={isAdmin}>
                        <Input
                            placeholder="Search for products..."
                            type="search"
                            className="bg-transparent border border-zinc-400 hover:border-zinc-700 focus:outline focus:outline-2 focus:outline-zinc-700 rounded-md py-1.5 px-3 transition placeholder-zinc-700"
                        />
                        <Search
                            size={19}
                            className="absolute top-2.5 right-2.5 text-zinc-700"
                        />
                    </form>
                    <Button
                        variant="ghost"
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
                    <Button variant="ghost" className="px-2" hidden={isAdmin}>
                        <ShoppingCart className="text-zinc-900" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
