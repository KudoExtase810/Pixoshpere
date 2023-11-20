import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DrawerContextProvider from "@/contexts/DrawerContext";
import Cart from "@/components/Cart";
import { Toaster } from "sonner";

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
            <DrawerContextProvider>
                <body className={inter.className}>
                    <Navbar />
                    <main className="container mx-auto">
                        <Toaster duration={6000} richColors />
                        <Cart />
                        {children}
                    </main>
                    <Footer />
                </body>
            </DrawerContextProvider>
        </html>
    );
}
