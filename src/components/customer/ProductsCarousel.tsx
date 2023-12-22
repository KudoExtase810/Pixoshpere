"use client";

import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import SingleProduct from "./SingleProduct";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

interface props {
    title: string;
    hideControls?: boolean;
    products: Product[];
}

const ProductsCarousel = ({
    title,
    hideControls,

    products,
}: props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        skipSnaps: true,
        slidesToScroll: 1.5,
    });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    );
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    );

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);

        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    const shouldHideControls =
        hideControls || (prevBtnDisabled && nextBtnDisabled);

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
            <div className="overflow-hidden">
                <div ref={emblaRef}>
                    <ul className="flex gap-8">
                        {products.map((product) => (
                            <SingleProduct
                                product={product}
                                className="min-w-[180px] md:min-w-[250px]"
                                key={product._id}
                            />
                        ))}
                    </ul>
                </div>
                {!shouldHideControls && (
                    <div className="mt-4 flex items-center justify-between">
                        <Button onClick={scrollPrev} disabled={prevBtnDisabled}>
                            <ChevronLeft size={28} />
                        </Button>
                        <Button onClick={scrollNext} disabled={nextBtnDisabled}>
                            <ChevronRight size={28} />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsCarousel;
