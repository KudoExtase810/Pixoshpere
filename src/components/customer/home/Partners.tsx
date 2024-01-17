"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const Partners = () => {
    // You can get more of these logos from https://www.vectorlogo.zone/logos
    const partners = [
        { name: "Netlify", src: "/svgs/netlify.svg" },
        { name: "Payoneer", src: "/svgs/payoneer.svg" },
        { name: "ScyllaDB", src: "/svgs/scylladb.svg" },
        { name: "Steam", src: "/svgs/steam.svg" },
        { name: "Tesla", src: "/svgs/tesla.svg" },
        { name: "The Orchard", src: "/svgs/theorchard.svg" },
        { name: "Twitter", src: "/svgs/twitter.svg" },
        { name: "Walmart", src: "/svgs/walmart.svg" },
    ];

    return (
        <Marquee autoFill className="py-8">
            {partners.map((partner, idx) => (
                <Image
                    className="mx-2 w-40 sm:w-56"
                    key={idx}
                    src={partner.src}
                    alt={partner.name}
                    height={80}
                    width={240}
                />
            ))}
        </Marquee>
    );
};

export default Partners;
