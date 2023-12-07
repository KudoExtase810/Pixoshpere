import Product from "@/models/product";

interface Props {
    currentProduct: { slug: string; category: string };
}

const SimilarProducts = async ({ currentProduct }: Props) => {
    const { slug, category } = currentProduct;

    // Find products with the same category but not the same slug
    const similarProducts = await Product.aggregate([
        { $match: { category, slug: { $ne: slug } } },
        { $sample: { size: 6 } },
    ]);

    return <div>SimilarProducts</div>;
};

export default SimilarProducts;
