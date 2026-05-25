import express from "express";
import upload from "../middlewares/uploadS3.js";
const router = express.Router();
router.post("/upload", upload.array("images", 10), async (req, res) => {
    try { 
        console.log("FILES:", req.files);
        
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded"
            });
        }
        
        const imageUrls = req.files.map(file => file.location);
        
        res.status(200).json({
            success: true,
            images: imageUrls
        });
        
    } catch (error) {
        
        console.log("UPLOAD ERROR:", error);
        
        res.status(500).json({
            message: error.message
        });
    }
});
export default router;