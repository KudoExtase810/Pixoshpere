import Settings from "@/settings/index.json";

const FormatPricing = ({
    price,
    salePrice,
}: {
    price: number;
    salePrice?: number;
}) => {
    const { currency } = Settings;
    const formatted = salePrice ? (
        <>
            <span className="line-through text-neutral-500 text-sm">
                {currency}
                {price}
            </span>{" "}
            <span className="text-sm text-primary">
                {currency}
                {salePrice}
            </span>
        </>
    ) : (
        <span className="text-sm text-primary">
            {currency}
            {price}
        </span>
    );

    return formatted;
};

export default FormatPricing;
