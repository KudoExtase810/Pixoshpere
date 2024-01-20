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
                    <div className="w-full h-[720px] flex items-center relative bg-[url(/images/geforce-banner.webp)] bg-cover">
                        <div className="container mx-auto text-white">
                            <h1 className="styled ">Awesome 8-bit planets.</h1>
                            <p className="styled text-lg mb-6">
                                Explore the cosmos with our pixel art planet
                                collection.
                            </p>
                            <Button
                                className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 px-10 text-base"
                                asChild
                            >
                                <Link href="/products">Start Exploring</Link>
                            </Button>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="w-full h-[720px] flex items-center relative bg-[url(/images/laptop-banner.webp)] bg-cover">
                        <div className="container mx-auto text-white">
                            <h1 className="styled ">
                                Your Source for Stunning <br />
                                Pixel Art Planets
                            </h1>
                            <p className="styled text-lg mb-6 ">
                                Embark on a celestial journey with our curated
                                collection of pixel art planets.
                            </p>
                            <Button
                                className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 px-10 text-base"
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
