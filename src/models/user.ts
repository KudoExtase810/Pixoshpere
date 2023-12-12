import mongoose from "mongoose";
import Order from "./order";
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 64,
            unique: true,
            lowercase: true,
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        orders: { type: [mongoose.SchemaTypes.ObjectId], ref: Order.modelName },
        isVerified: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
    },

    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;