import { Search, ShoppingCart, Sun } from "lucide-react";
import Link from "next/link";

const Navbar = ({ isAdmin }: { isAdmin?: boolean }) => {
    const links = [
        { label: "All", href: "/" },
        { label: "Apparel", href: "/" },
        { label: "Accessories", href: "/" },
    ];
    return (
        <header className="sticky top-0 flex py-3.5 px-12 items-center justify-between bg-neutral-200/50 backdrop-blur text-sm">
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
                    <input
                        placeholder="Search for products..."
                        type="search"
                        className="bg-transparent border border-zinc-400 hover:border-zinc-700 focus:outline focus:outline-2 focus:outline-zinc-700 rounded-md py-1.5 px-3 transition placeholder-zinc-700"
                    />
                    <Search
                        size={18}
                        className="absolute top-2 right-2.5 text-zinc-700"
                    />
                </form>

                <button>
                    <Sun className="text-zinc-900" />
                </button>
                <button hidden={isAdmin}>
                    <ShoppingCart className="text-zinc-900" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
