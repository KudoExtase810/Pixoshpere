import mongoose from "mongoose";
const KeySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    hashed_password: String,
});

const Key = mongoose.models.Key ?? mongoose.model("Key", KeySchema);

export default Key;
