import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
    {
        code: { type: String, minLength: 2, maxLength: 16, required: true },
        expiresAt: { type: Date, required: true },
        discountType: {
            type: String,
            enum: ["fixed", "percentage"],
            required: true,
        },
        discountValue: { type: Number, min: 0, required: true },
        isDisabled: { type: Boolean, default: true },
        minAmount: { type: Number, required: true, min: 0 },
        timesApplied: { type: Number, min: 0, default: 0 },
    },
    { timestamps: true }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);

export default Coupon;
