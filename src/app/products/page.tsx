import Animate from "@/components/Animate";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "@/components/FormatPricing";
import ProductsFilters from "@/components/customer/ProductsFilters";
import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import Link from "next/link";
import React from "react";

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const query = searchParams.q;
    const category = searchParams.category;
    const sortBy = searchParams.sortBy;
    const page = parseInt(searchParams.page || "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectDB();

    const queryObj: any = {};
    if (query) {
        queryObj.title = { $regex: query, $options: "i" };
    }

    if (category) {
        queryObj.category = category;
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }

    const products = await Product.find<Product>(queryObj)
        .limit(limit)
        .skip(skip)
        .sort(sortObj)
        .populate("category")
        .select("-description");

    const totalDocs = await Product.countDocuments(queryObj);

    return (
        <div className="container">
            <h1 className="page-title">All products</h1>
            <ProductsFilters />
            <Animate
                isList
                className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
                {[
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                ].map((product) => (
                    <li>
                        <Link
                            href={`/products/${product.slug}`}
                            className="group"
                        >
                            <BlurImage
                                src={product.images[0].url}
                                alt={product.title}
                            />
                            <div className="flex items-center justify-between px-2 mt-2">
                                <h3 className=" text-sm text-gray-700 dark:text-gray-500">
                                    {product.title}
                                </h3>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-700">
                                    <FormatPricing
                                        price={product.price}
                                        salePrice={product.salePrice}
                                    />
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </Animate>
        </div>
    );
};

export default Products;
