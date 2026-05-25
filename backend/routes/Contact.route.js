import express from "express";
import { requireAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    sendContact,
    getContacts,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/contact", sendContact);
router.get("/contacts", requireSignIn,requireAdmin, getContacts);

export default router;