import express from "express";
import {
  createRequest,
  getRequestsForInterviewer,
  submitInterviewerAvailability,
  matchRequestSlots
} from "../controllers/request.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// candidate creates request
router.post("/", protect, createRequest);

// interviewer views pending requests
router.get("/", protect, getRequestsForInterviewer);

// interviewer submits availability after clicking request
router.post("/interviewer-availability", protect, submitInterviewerAvailability);

// match slots only after interviewer availability
router.post("/match-slots", protect, matchRequestSlots);

export default router;
