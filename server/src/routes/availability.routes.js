import express from "express";
import { submitAvailability } from "../controllers/availability.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, submitAvailability);

export default router;
