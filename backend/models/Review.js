import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        rating: Number,
        comment: String,
    },
    { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);