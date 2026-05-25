import express from "express";
import { requireSignIn, requireAdmin, requireAgent } from "../middlewares/authMiddleware.js";

import {
  fetchAllPropertiesAdmin,
  fetchAllProperties,
  fetchAgentProperties,
  getSingleProperty,
  newProperty,
  editProperty,
  deleteProperty,
  approvedProperty,
  rejectProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

//  Admin Routes
router.get("/admin", requireSignIn,requireAdmin, fetchAllPropertiesAdmin);
router.put("/approve-property/:id", requireSignIn, requireAdmin, approvedProperty);
router.put("/reject-property/:id", requireSignIn, requireAdmin, rejectProperty);
//  Public Routes
router.get("/all", fetchAllProperties);

// Agent Routes
router.get("/agent/listings", requireSignIn, fetchAgentProperties);
router.post("/", requireSignIn, newProperty);
router.put("/edit/property/:id", requireSignIn, editProperty);
router.delete("/:id", requireSignIn, deleteProperty);

router.get("/:id", getSingleProperty);

export default router;