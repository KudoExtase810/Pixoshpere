import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, minLength: 4, maxLength: 96, required: true },
        slug: { type: String, minLength: 4, maxLength: 192 },
        price: { type: Number, min: 0, max: 500000, required: true },
        salePrice: { type: Number, min: 0, max: 500000 },
        priority: { type: Number, default: 0, min: 0, max: 5000 },
        image: { type: String, maxLength: 256, required: true },
        description: { type: String, maxLength: 2048, required: true },
        hidden: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Product =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
