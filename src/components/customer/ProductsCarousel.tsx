"use client";

import SingleProduct from "./SingleProduct";
import { MoveRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";

interface props {
    title: string;
    hideControls?: boolean;
    products: Product[];
    isLoading?: boolean;
}

const ProductsCarousel = ({
    title,
    hideControls = false,
    products,
    isLoading = false,
}: props) => {
    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="styled">{title}</h3>
                <div className="relative">
                    <Link
                        href="/products"
                        className="flex gap-2 items-center peer"
                    >
                        All products <MoveRight size={18} />
                    </Link>
                    <div className="absolute h-[1px] w-[0.01px] peer-hover:w-full bg-primary mt-1 transition-all duration-500"></div>
                </div>
            </div>

            <Carousel
                opts={
                    {
                        // align: "center",
                    }
                }
                className="w-full"
            >
                {!isLoading ? (
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem
                                key={product._id}
                                className="basis-1/3 sm:basis-1/4 lg:basis-1/5"
                            >
                                <SingleProduct product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                ) : (
                    <CarouselContent>
                        {[...new Array(6)].map((_, idx) => (
                            <CarouselItem
                                key={idx}
                                className="basis-1/3 sm:basis-1/4 lg:basis-1/5"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <Skeleton className="aspect-1 rounded-md mb-1" />
                                    <Skeleton className="rounded-sm w-4/5 h-5" />
                                    <Skeleton className="rounded-sm w-2/5 h-5" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                )}
                {!hideControls && !isLoading && (
                    <div className="relative w-11/12 mx-auto mt-6">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                )}
            </Carousel>
        </section>
    );
};

export default ProductsCarousel;
