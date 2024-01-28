import mongoose from "mongoose";
import User from "@/models/user";

const OrderSchema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    id: String,
                    title: String,
                    price: Number,
                    quantityBought: Number,
                },
            ],
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        },
        customer: {
            type: String,
            ref: User.modelName,
            required: true,
        },
        tax: Number,
        shippingCost: Number,
        total: { type: Number, required: true },
        appliedCoupon: String,
        discount: { type: Number, min: 0, default: 0 },
        details: {
            streetAddress: String,
            city: String,
            zipCode: String,
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
