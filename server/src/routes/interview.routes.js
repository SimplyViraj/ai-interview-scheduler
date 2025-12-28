import express from "express";
import { getMyInterviews } from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getMyInterviews);

export default router;
