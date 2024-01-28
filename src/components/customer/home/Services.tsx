import Image from "next/image";
import React from "react";

const Services = () => {
    const data = [
        {
            title: "Fast & Secure Delivery",
            description: "Swift, secure shipping service.",
            imageSrc: "/images/fast-delivery.png",
        },
        {
            title: "3 Days Return Policy",
            description: "Easy returns within 3 days.",
            imageSrc: "/images/returns.png",
        },
        {
            title: "Money Back Guarantee",
            description: "Assured refund policy.",
            imageSrc: "/images/guarantee-certificate.png",
        },
        {
            title: "24 X 7 Service",
            description: "24/7 customer support.",
            imageSrc: "/images/24-hours-support.png",
        },
    ];

    return (
        <ul className="grid grid-cols-4 place-items-center max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:items-center gap-4 py-8">
            {data.map((feature, idx) => (
                <li className="flex gap-4 items-center" key={idx}>
                    <Image
                        src={feature.imageSrc}
                        height={58}
                        width={58}
                        unoptimized
                        alt={feature.title}
                    />

                    <div className="max-lg:w-60">
                        <p className="font-semibold text-lg max-xl:text-base max-lg:text-lg mb-1">
                            {feature.title}
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-300 text-base max-xl:text-sm max-lg:text-base">
                            {feature.description}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Services;
