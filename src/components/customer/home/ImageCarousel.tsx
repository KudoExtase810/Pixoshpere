"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

export const ImageCarousel = () => {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    const images = [
        { src: "/images/banner1.jpg", alt: "idk" },
        { src: "/images/banner2.jpg", alt: "idk" },
        { src: "/images/banner3.jpg", alt: "idk" },
    ];
    return null;
    return (
        <Carousel className="w-full" plugins={[plugin.current]}>
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem>
                        <Image
                            key={image.src}
                            src={image.src}
                            width={1920}
                            height={1080}
                            quality={100}
                            unoptimized
                            className="object-cover"
                            alt={image.alt}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>
    );
};

export default ImageCarousel;
