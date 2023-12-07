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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mediastore Tech",
    description: "Vente de materiel informatique",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system">
                    <AuthProvider>
                        <ActionContextProvider>
                            <CartContextProvider>
                                <ModalContextProvider>
                                    <Navbar />
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
