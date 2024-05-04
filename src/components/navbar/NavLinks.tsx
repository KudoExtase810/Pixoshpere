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

import { cn } from "@/lib/utils";
import { Link, useRouter } from "@/lib/navigation";

interface NavLinksProps {
    pathname: string;
    isAdmin: boolean;
    isAdminSide: boolean;
}

const NavLinks = ({ pathname, isAdmin, isAdminSide }: NavLinksProps) => {
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

    const router = useRouter();

    return (
        <>
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
                                            {link.subLinks.map((subLink) => (
                                                <ListItem
                                                    //TODO: find better solution for using the next-intl link here without router.push
                                                    key={subLink.label}
                                                    title={subLink.label}
                                                    onClick={() =>
                                                        router.push(
                                                            subLink.href
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            );
                        }
                    })}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="lg:hidden">
                <ul className="flex flex-col gap-3.5 text-centers text-zinc-500">
                    {relevantLinks.map((link) => {
                        if (!link.subLinks) {
                            return (
                                <li key={link.label}>
                                    <Link
                                        className={cn(
                                            pathname === link.href &&
                                                "text-primary"
                                        )}
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        } else {
                            return (
                                <li key={link.label}>
                                    <h5 className="text-teal-500 mb-2 flex items-center gap-2">
                                        <span>{link.label}</span>
                                        <div className="bg-teal-500 h-0.5 w-full" />
                                    </h5>
                                    <ul className="flex flex-col gap-3 ml-2.5">
                                        {link.subLinks.map((subLink) => (
                                            <li key={subLink.label}>
                                                <Link
                                                    className={cn(
                                                        pathname ===
                                                            subLink.href &&
                                                            "text-primary"
                                                    )}
                                                    href={subLink.href}
                                                >
                                                    {subLink.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </>
    );
};

export default NavLinks;
