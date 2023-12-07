import Animate from "@/components/Animate";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "@/components/FormatPricing";
import ProductsFilters from "@/components/customer/ProductsFilters";
import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import axios from "axios";
import Link from "next/link";
import React from "react";

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const query = searchParams.q || "";
    const category = searchParams.category || "";
    const sortBy = searchParams.sortBy || "";
    const page = searchParams.page || 1;
    const { data } = (await axios.get(
        `${process.env.CLIENT_URL}/api/products?q=${query}&category=${category}&sortBy=${sortBy}&page=${page}`
    )) as { data: { products: Product[]; totalDocs: number } };
    return (
        <>
            <h1 className="page-title">All products</h1>
            <ProductsFilters />
            <Animate
                isList
                className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
                {[
                    ...data.products,
                    ...data.products,
                    ...data.products,
                    ...data.products,
                    ...data.products,
                    ...data.products,
                    ...data.products,
                    ...data.products,
                    ...data.products,
                    ...data.products,
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
        </>
    );
};

export default Products;
