import mongoose from "mongoose";
import Product from "./product";
const OrderSchema = new mongoose.Schema(
    {
        products: { type: [mongoose.SchemaTypes.ObjectId], ref: Product },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "processing", "shipped", "delivered"],
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;