import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema(
    {
        email: { type: String },
    },
    { timestamps: true }
);

const Customer =
    mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export default Customer;
