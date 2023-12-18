import mongoose from "mongoose";
import Product from "./product";
import User from "@/models/user";
const OrderSchema = new mongoose.Schema(
    {
        products: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: Product.modelName,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "processing", "shipped", "delivered", "canceled"],
            required: true,
        },
        customer: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: User.modelName,
            required: true,
        },
        paymentMethod: { type: String, required: true },
        total: { type: Number, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
