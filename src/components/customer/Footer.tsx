"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();

    // Show the footer only in these paths
    const visibleFooterPaths = ["/"];
    if (!visibleFooterPaths.includes(pathname)) return null;

    const links = [
        {
            collectionName: "Category 1",
            links: [
                { name: "Item 1", url: "/item1" },
                { name: "Item 2", url: "/item2" },
            ],
        },
        {
            collectionName: "Category 2",
            links: [
                { name: "Item 3", url: "/item3" },
                { name: "Item 4", url: "/item4" },
            ],
        },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-200/60 dark:bg-black/60 mt-16">
            <div className="mx-auto container">
                <div className="grid grid-cols-3 gap-8 py-14">
                    {links.map((collection, index) => (
                        <div key={index}>
                            <h3 className="text-sm font-semibold ">
                                {collection.collectionName}
                            </h3>
                            <ul className="mt-4 space-y-4 [&>li]:text-neutral-500 w-fit">
                                {collection.links.map((link, idx) => (
                                    <li
                                        key={idx}
                                        className="text-sm hover:text-neutral-600 dark:hover:text-neutral-400"
                                    >
                                        <Link href={link.url}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col justify-between border-t border-neutral-300 dark:border-neutral-200 py-10 sm:flex-row">
                    <p className="text-sm text-neutral-500">
                        Copyright &copy; {currentYear} Your Store, Inc.
                    </p>
                    <p className="text-sm text-neutral-500">
                        Crafted by{" "}
                        <a
                            href="https://alaaben.vercel.app"
                            className="underline"
                        >
                            Alaa Ben
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
