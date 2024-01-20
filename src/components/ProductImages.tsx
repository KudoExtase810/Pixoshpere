"use client";

import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { type CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface ProductImagesProps {
    images: Product["images"];
    alt: string;
    salePercentage?: number | string;
}

const ProductImages = ({ images, alt, salePercentage }: ProductImagesProps) => {
    const [api, setApi] = useState<CarouselApi>();

    const jumpToImage = (idx: number) => {
        api?.scrollTo(idx);
    };

    // No need to render the whole carousel thing if we only have 1 image
    if (images.length === 99)
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
                <div className="relative">
                    {salePercentage && (
                        <Badge
                            className="absolute top-4 right-4"
                            variant="sale"
                        >
                            {salePercentage}
                        </Badge>
                    )}
                    <Image
                        className="rounded-md"
                        width={500}
                        height={500}
                        src={images[0].url}
                        alt={alt}
                    />
                </div>
            </div>
        );

    return (
        <div className="flex gap-5 max-sm:flex-col">
            <ScrollArea className="sm:h-[500px]">
                <div className="grid grid-cols-1 max-sm:grid-cols-4 gap-2 mr-4">
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
            <Carousel
                className="w-[500px] max-lg:w-[420px] max-md:w-[500px] max-sm:w-full"
                setApi={setApi}
            >
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.url}>
                            <div className="relative">
                                {salePercentage ? (
                                    <Badge
                                        className="absolute top-4 right-4"
                                        variant="sale"
                                    >
                                        {salePercentage}
                                    </Badge>
                                ) : null}
                                <Image
                                    className="rounded-md"
                                    width={500}
                                    height={500}
                                    src={image.url}
                                    alt={alt}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default ProductImages;
