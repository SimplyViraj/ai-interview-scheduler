import express from "express";
import {
  createRequest,
  getRequestsForInterviewer,
  markRequestMatched,
  matchRequestSlots
} from "../controllers/request.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/", protect, getRequestsForInterviewer);
router.post("/match", protect, markRequestMatched);

/* 🔥 THIS LINE IS CRITICAL */
router.post("/match-slots", protect, matchRequestSlots);

export default router;
