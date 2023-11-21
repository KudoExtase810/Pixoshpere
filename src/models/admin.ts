import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 64,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 512,
        },
    },
    { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
