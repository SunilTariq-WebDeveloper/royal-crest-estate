import express from "express";
import { createReview, getReviewsByProperty } from "../controllers/Review.controller.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/create",requireSignIn, createReview);
router.get("/:propertyId", getReviewsByProperty);

export default router;