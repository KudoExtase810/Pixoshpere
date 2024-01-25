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
                        <div className="container mx-auto text-white z-[3]">
                            <h1 className="styled ">
                                Your source for everything tech related.
                            </h1>
                            <p className="styled text-lg mb-6">
                                Uncover the latest in laptops, hardware, and
                                tech innovations tailored for your digital
                                lifestyle.
                            </p>
                            <Button
                                className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 px-10 text-base"
                                asChild
                            >
                                <Link href="/products">View Products</Link>
                            </Button>
                        </div>
                        {/* Uncomment the line below if something is wrong with the constrast */}
                        {/* <div className="bg-zinc-900 absolute inset-0 w-full h-full z-[2] bg-opacity-30" /> */}
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="w-full h-[720px] flex items-center relative bg-[url(/images/laptop-banner.webp)] bg-cover">
                        <div className="container mx-auto text-white z-[3]">
                            <h1 className="styled ">
                                Your source for everything tech related
                            </h1>
                            <p className="styled text-lg mb-6 ">
                                Uncover the latest in laptops, hardware, and
                                tech innovations tailored for your digital
                                lifestyle.
                            </p>
                            <Button
                                className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 px-10 text-base"
                                asChild
                            >
                                <Link href="/products">Shop Now</Link>
                            </Button>
                        </div>
                        {/* Uncomment the line below if something is wrong with the constrast */}
                        {/* <div className="bg-zinc-900 absolute inset-0 w-full h-full z-[2] bg-opacity-30" /> */}
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
};

export default HeroBanners;
