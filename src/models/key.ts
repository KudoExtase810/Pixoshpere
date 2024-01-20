import mongoose from "mongoose";
const KeySchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        hashed_password: String,
    },
    { _id: false }
);

const Key = mongoose.models.Key ?? mongoose.model("Key", KeySchema);

export default Key;
