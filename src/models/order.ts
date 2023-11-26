import mongoose from "mongoose";
import Product from "./product";
import Customer from "./customer";
const OrderSchema = new mongoose.Schema(
    {
        products: { type: [mongoose.SchemaTypes.ObjectId], ref: Product },
        customer: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: Customer.modelName,
        },
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
