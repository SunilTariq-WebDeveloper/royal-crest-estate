import { Schema, model } from "mongoose";

const propertySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        address: { type: String, required: true },
        price: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        sqft: { type: String, required: true },
        type: { type: String, required: true, enum: ["Villa", "Penthouse", "Estate", "Loft", "Cabin", "Smart Home"] },
        images: { type: [String], required: true },
        isNew: { type: Boolean, required: true },
        location: { type: String, required: true },
        status: { type: String, enum: ["pending", "approved", "rejected", "active", "Sold"], default: "Pending" },
        isFeatured: { type: Boolean, required: true },
        amenities: { type: [String], required: true },
        agent: { type: Schema.Types.ObjectId, ref: "User", required: true },
        rating: {type: Number, default: 0},
        numReviews: { type: Number,default: 0},
        yearBuilt: { type: Number, required: true },
        approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);
 
const PropertyModel = model("Property", propertySchema);
export default PropertyModel;






















