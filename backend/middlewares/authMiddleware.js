import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Login required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
export const requireAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
             message: "Admin access required"
             });
    }
    next();
};

export const requireAgent = (req, res, next) => {
    if (req.user.role !== "agent") {
        return res.status(403).json({ message: "Agent access required" });
    }
    next();
};
export const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access denied" })
        }
        next()
    }
}