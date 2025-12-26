import express from "express";
import { submitAvailability } from "../controllers/availability.controller.js";

const router = express.Router();
router.post("/", submitAvailability);

export default router;
