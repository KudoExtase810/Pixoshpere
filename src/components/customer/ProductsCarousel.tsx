"use client";

import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import SingleProduct from "./SingleProduct";
import { useCallback, useEffect, useState } from "react";
import {
    ArrowBigLeft,
    ArrowBigRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";

interface props {
    title: string;
    products: Product[];
}

const ProductsCarousel = ({ title, products }: props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        skipSnaps: true,
        slidesToScroll: 1.5,
    });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

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

    return (
        <section className="py-8">
            <h3 className="styled mb-4">{title}</h3>
            <div className="overflow-hidden">
                <div ref={emblaRef}>
                    <ul className="flex gap-8">
                        {[
                            ...products,
                            ...products,
                            ...products,
                            ...products,
                        ].map((product, idx) => (
                            <SingleProduct
                                product={product}
                                className="min-w-[180px] md:min-w-[250px]"
                                key={product._id + idx}
                            />
                        ))}
                    </ul>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <Button onClick={scrollPrev} disabled={prevBtnDisabled}>
                        <ChevronLeft size={30} />
                    </Button>
                    <Button onClick={scrollNext} disabled={nextBtnDisabled}>
                        <ChevronRight size={30} />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ProductsCarousel;
