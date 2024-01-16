"use client";

import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { type CarouselApi } from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "./ui/carousel";
import { useEffect, useState } from "react";

interface ProductImagesProps {
    images: Product["images"];
    alt: string;
}

const ProductImages = ({ images, alt }: ProductImagesProps) => {
    const [api, setApi] = useState<CarouselApi>();

    const jumpToImage = (idx: number) => {
        api?.scrollTo(idx);
    };

    // No need to render the whole carousel thing if we only have 1 image
    if (images.length === 1)
        return (
            <div className="flex gap-5">
                <div className="h-[500px]">
                    <div className="mr-4">
                        <Image
                            alt={alt}
                            src={images[0].url}
                            width={100}
                            height={100}
                            quality={100}
                            className="rounded-md"
                        />
                    </div>
                </div>
                <Image
                    className="rounded-md"
                    width={500}
                    height={500}
                    src={images[0].url}
                    alt={alt}
                />
            </div>
        );

    return (
        <div className="flex gap-5">
            <ScrollArea className="h-[500px]">
                <div className="flex flex-col gap-2 mr-4">
                    {images.map((image, idx) => (
                        <button
                            onClick={() => jumpToImage(idx)}
                            key={image.url}
                        >
                            <Image
                                alt={alt}
                                src={image.url}
                                width={100}
                                height={100}
                                quality={100}
                                className="rounded-md"
                            />
                            <span className="sr-only">
                                Jump to photo number {idx + 1}
                            </span>
                        </button>
                    ))}
                </div>
            </ScrollArea>
            <Carousel className="w-[500px]" setApi={setApi}>
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.url}>
                            <Image
                                className="rounded-md"
                                width={500}
                                height={500}
                                src={image.url}
                                alt={alt}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default ProductImages;
