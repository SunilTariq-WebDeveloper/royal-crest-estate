import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
    createInquiry,
    getAgentInquiries,
} from "../controllers/inquiry.controller.js";

const router = express.Router();

router.post("/inquiry", createInquiry);
router.get("/get-inquiry", requireSignIn, getAgentInquiries);

export default router;