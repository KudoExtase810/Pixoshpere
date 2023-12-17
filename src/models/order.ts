import mongoose from "mongoose";
import Product from "./product";
import User from "@/models/user";
const OrderSchema = new mongoose.Schema(
    {
        products: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: Product.modelName,
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        },
        customer: { type: mongoose.SchemaTypes.ObjectId, ref: User.modelName },
        paymentMethod: String,
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
