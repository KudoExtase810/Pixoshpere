import Animate from "@/components/Animate";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "@/components/FormatPricing";
import ProductsFilters from "@/components/customer/ProductsFilters";
import SingleProduct from "@/components/customer/SingleProduct";
import connectDB from "@/lib/connectdb";
import Category from "@/models/category";
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

    const allCategories = await Category.find<Category>({}).select("label");

    return (
        <div className="container">
            <h1 className="page-title">All products</h1>
            <ProductsFilters allCategories={allCategories} />
            <Animate
                isList
                className="mb-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
                {products.map((product) => (
                    <li key={product._id}>
                        <SingleProduct
                            product={JSON.parse(JSON.stringify(product))}
                        />
                    </li>
                ))}
            </Animate>
        </div>
    );
};

export default Products;
