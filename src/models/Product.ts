import mongoose from "mongoose";
import Category from "./category";
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minLength: 4,
            maxLength: 96,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            minLength: 4,
            maxLength: 192,
            required: true,
            unique: true,
        },
        price: { type: Number, min: 0, max: 500000, required: true },
        salePrice: { type: Number, min: 0, max: 500000 },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: Category,
            required: true,
        },
        quantity: { type: Number, min: 0, max: 128, required: true },
        priority: { type: Number, default: 0, min: 0, max: 5000 },
        images: {
            type: [{ publicId: String, url: String }],
            required: true,
        },
        description: { type: String, maxLength: 2048, required: true },
        sales: { type: Number, default: 0, max: 10000 },
        isHidden: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Product =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
