"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export const ImageCarousel = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);
    return null;
    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slid w-full h-[480px]">
                    <Image
                        src="/images/forest1.png"
                        className="object-cover"
                        fill
                        alt=""
                    />
                </div>
                <div className="embla__slid w-full h-[480px]">
                    <Image
                        src="/images/forest2.jpg"
                        className="object-cover"
                        fill
                        alt=""
                    />
                </div>
                <div className="embla__slid w-full h-[480px]">
                    <Image
                        src="/images/forest3.jpg"
                        className="object-cover"
                        fill
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
