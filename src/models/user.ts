import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
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
        phone: { type: String },
        isVerified: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
    },

    { timestamps: true, _id: false }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
