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

interface props {
    title: string;
    hideControls?: boolean;
    products: Product[];
}

const ProductsCarousel = ({ title, hideControls, products }: props) => {
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
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/5">
                            <SingleProduct
                                product={product}
                                key={product._id}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {!hideControls && (
                    <div className="relative w-11/12 mx-auto mt-5">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                )}
            </Carousel>
        </section>
    );
};

export default ProductsCarousel;
