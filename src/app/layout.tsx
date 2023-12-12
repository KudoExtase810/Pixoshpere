import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/tiptap.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/customer/Footer";
import Cart from "@/components/customer/Cart";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import ProductDrawer from "@/components/administration/products/ProductDrawer";
import CategoryDrawer from "@/components/administration/categories/CategoryDrawer";
import ModalContextProvider from "@/contexts/ModalContext";
import ActionContextProvider from "@/contexts/ActionContext";
import CartContextProvider from "@/contexts/CartContext";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Wrench } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mediastore Tech",
    description: "Vente de materiel informatique",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    const isAdmin = true;

    return (
        <html lang="en">
            <body className={inter.className}>
                {isAdmin && (
                    <Link
                        className="rounded-full p-2.5 bg-orange-600 hover:bg-orange-700 fixed top-24 right-8 transition-colors"
                        href="/administration"
                    >
                        <Wrench size={30} />
                        <span className="sr-only">
                            Navigate to the administartion panel
                        </span>
                    </Link>
                )}
                <ThemeProvider attribute="class" defaultTheme="system">
                    <AuthProvider>
                        <ActionContextProvider>
                            <CartContextProvider>
                                <ModalContextProvider>
                                    <Navbar isLoggedIn={session !== null} />
                                    <main className="container mx-auto">
                                        <Toaster duration={7500} richColors />
                                        <Cart />
                                        {children}
                                    </main>
                                    <Footer />
                                </ModalContextProvider>
                            </CartContextProvider>
                        </ActionContextProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
