import mongoose from "mongoose";
const SessionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    active_expires: {
        type: Number,
        required: true,
    },
    idle_expires: {
        type: Number,
        required: true,
    },
});

const Session =
    mongoose.models.Session ?? mongoose.model("Session", SessionSchema);

export default Session;
