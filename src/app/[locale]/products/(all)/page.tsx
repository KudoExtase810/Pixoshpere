import NoResults from "@/components/administration/NoResults";
import Animate from "@/components/Animate";
import ProductFiltersDrawer from "@/components/customer/products/ProductFiltersDrawer";
import ProductsFilters from "@/components/customer/products/ProductsFilters";
import ShowMore from "@/components/customer/products/ShowMore";
import SingleProduct from "@/components/customer/SingleProduct";
import ProductFiltersContextProvider from "@/contexts/ProductFiltersContext";
import connectDB from "@/lib/connectdb";
import Category from "@/models/category";
import Product from "@/models/product";

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const query = searchParams.q;
    const category = searchParams.category;
    const minPrice = Number(searchParams.min || "0");
    const maxPrice = Number(searchParams.max || "0");
    const hideOutOfStock = searchParams["hide-oos"] === "true";
    const onSaleOnly = searchParams.onsale === "true";
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

    if (hideOutOfStock) {
        queryObj.quantity = { $gt: 0 };
    }

    if (onSaleOnly) {
        queryObj.salePrice = { $gt: 0 };
    }

    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = 1;
    }

    let products = (await Product.find({ ...queryObj, isHidden: false })
        .limit(limit)
        .skip(skip)
        .sort(sortObj)
        .populate("category")
        .select("-description")
        .lean()) as Omit<Product, "description">[];

    const mostExpensiveProduct = products.reduce(
        (maxProduct, currentProduct) => {
            const currentEffectivePrice =
                currentProduct.salePrice || currentProduct.price;
            const maxEffectivePrice = maxProduct.salePrice || maxProduct.price;

            return currentEffectivePrice > maxEffectivePrice
                ? currentProduct
                : maxProduct;
        },
        products[0]
    );

    const highestPrice =
        mostExpensiveProduct?.salePrice || mostExpensiveProduct?.price;

    const totalDocs = await Product.countDocuments(queryObj);

    const allCategories = (await Category.find({})
        .select("label")
        .lean()) as Pick<Category, "label" | "_id">[];

    // filter by price range here because idk how to do it with mongoose lol
    if (minPrice || maxPrice) {
        products = products.filter((p) => {
            if (p.salePrice) {
                return p.salePrice >= minPrice && p.salePrice <= maxPrice;
            } else {
                return p.price >= minPrice && p.price <= maxPrice;
            }
        });
    }

    return (
        <div className="container">
            <h1 className="pb-4 pt-6 text-4xl font-semibold">All products</h1>
            <ProductFiltersContextProvider>
                <ProductFiltersDrawer highestPrice={highestPrice} />
                <ProductsFilters
                    allCategories={JSON.parse(JSON.stringify(allCategories))}
                />
            </ProductFiltersContextProvider>
            {products.length > 0 ? (
                <>
                    <Animate
                        isList
                        className="mb-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                    >
                        {products.map((product) => (
                            <li key={product._id}>
                                <SingleProduct
                                    product={JSON.parse(
                                        JSON.stringify(product)
                                    )}
                                />
                            </li>
                        ))}
                    </Animate>
                    <ShowMore
                        totalDocs={totalDocs}
                        currentPage={page}
                        limit={limit}
                    />
                </>
            ) : (
                <NoResults />
            )}
        </div>
    );
};

export default Products;
