"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Sidebar = () => {
    const sidebarNavItems = [
        {
            title: "Account Details",
            href: "/profile",
        },
        {
            title: "Order History",
            href: "/profile/orders",
        },
    ];
    const pathname = usePathname();

    return (
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname === item.href
                            ? "bg-teal-500 hover:bg-teal-500"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
};
export default Sidebar;
