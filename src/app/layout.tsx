import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/tiptap.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/customer/Footer";
import Cart from "@/components/customer/Cart";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import ModalContextProvider from "@/contexts/ModalContext";
import ActionContextProvider from "@/contexts/ActionContext";
import CartContextProvider from "@/contexts/CartContext";

import { getServerSession } from "@/auth/utils";
import MobileSidebarContextProvider from "@/contexts/MobileSidebarContext";
import MobileSidebar from "@/components/navbar/MobileSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PixoSphere",
    description: "Buy pixel space entities",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoggedIn, isAdmin } = await getServerSession();

    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    enableSystem={false}
                    defaultTheme="dark"
                >
                    <ActionContextProvider>
                        <MobileSidebarContextProvider>
                            <CartContextProvider>
                                <ModalContextProvider>
                                    <Navbar
                                        isLoggedIn={isLoggedIn}
                                        isAdmin={isAdmin}
                                    />
                                    <main className="mx-auto">
                                        <Toaster richColors duration={5000} />
                                        <Cart />
                                        <MobileSidebar isAdmin={isAdmin} />
                                        {children}
                                    </main>
                                    <Footer />
                                </ModalContextProvider>
                            </CartContextProvider>
                        </MobileSidebarContextProvider>
                    </ActionContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
