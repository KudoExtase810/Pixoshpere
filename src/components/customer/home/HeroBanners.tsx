"use client";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useRef } from "react";

export const HeroBanners = () => {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <Carousel className="w-full mb-4" plugins={[plugin.current]}>
            <CarouselContent>
                <CarouselItem>
                    <div className="w-full h-[800px] flex items-center relative bg-[url(/images/banner2.png)] bg-cover">
                        <div className="container mx-auto">
                            <h1 className="styled">
                                The best pixel planets out there.
                            </h1>
                            <p className="styled text-lg mb-6">
                                Find the best deals in the market today!
                            </p>
                            <Button
                                className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 px-12 text-base"
                                asChild
                            >
                                <Link href="/products">Start Shopping</Link>
                            </Button>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="w-full h-[800px] flex items-center relative bg-[url(/images/banner1.png)] bg-cover">
                        <div className="container mx-auto">
                            <h1 className="styled text-fuchsia-500">
                                Get yourself a pixel planet.
                            </h1>
                            <p className="styled text-lg mb-6 text-fuchsia-500">
                                Find the best deals in the market today!
                            </p>
                            <Button
                                className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 px-12 text-base"
                                asChild
                            >
                                <Link href="/products">View Planets</Link>
                            </Button>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
};

export default HeroBanners;
