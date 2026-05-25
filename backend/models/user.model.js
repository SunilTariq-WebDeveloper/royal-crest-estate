import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["admin", "agent", "user"],
        default: "user"
    },
    isblock: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property"
        }
    ],
    otp: {},
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    postal_code: { type: String, default: "" },
    dob: { type: String, default: "" },
    phone: { type: String, default: "" },
    gender: { type: String, default: "" },
    bio: { type: String, default: "" },

}, { timestamps: true })

const User = model("User", userSchema)
export default User