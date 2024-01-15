import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/text-editor.css";
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
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <AuthProvider>
                        <ActionContextProvider>
                            <CartContextProvider>
                                <ModalContextProvider>
                                    <Navbar
                                        isLoggedIn={session !== null}
                                        isAdmin={isAdmin}
                                    />
                                    <main className="mx-auto">
                                        <Toaster richColors />
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
