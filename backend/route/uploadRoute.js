import express from "express";
import upload from "../middlewares/uploadS3.js"; // Chahein toh file ka naam baad mein change karke upload.js rakh sakte hain

const router = express.Router();

router.post("/upload", upload.array("images", 10), async (req, res) => {
    try {
        console.log("FILES:", req.files);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded"
            });
        }

        // Local storage ke liye 'file.path' use hoga
        const imageUrls = req.files.map(file => file.path);

        res.status(200).json({
            success: true,
            images: imageUrls
        });

    } catch (error) {
        console.log("UPLOAD ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;