"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface BlurImageProps {
    src: string;
    alt: string;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

const BlurImage = ({ src, alt, className }: BlurImageProps) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <div
            className={cn(
                "aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 xl:aspect-w-7 xl:aspect-h-8",
                className
            )}
        >
            <Image
                alt={alt}
                src={src}
                fill
                className={cn(
                    "duration-700 ease-in-out group-hover:opacity-75 object-cover",
                    isLoading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                )}
                onLoad={() => setLoading(false)}
            />
        </div>
    );
};

export default BlurImage;
