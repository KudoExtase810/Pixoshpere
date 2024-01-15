import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
        },
        subject: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Message =
    mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
