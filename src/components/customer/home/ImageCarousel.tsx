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
            <div className="flex overflow-hidden">
                <Image
                    src="/images/banner1.jpg"
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-auto max-w-full block"
                    alt=""
                />

                <Image
                    src="/images/banner2.jpg"
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-auto max-w-full block"
                    alt=""
                />

                <Image
                    src="/images/banner3.jpg"
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-auto max-w-full block"
                    alt=""
                />
            </div>
        </div>
    );
};

export default ImageCarousel;
