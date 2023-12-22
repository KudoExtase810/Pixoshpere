import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
    {
        label: { type: String, minLength: 2, maxLength: 36, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

const Category =
    mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
