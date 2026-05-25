import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);