import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
    {
        products: { type: [mongoose.SchemaTypes.ObjectId], ref: "Product" },
        user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
