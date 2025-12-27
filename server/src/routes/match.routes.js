import express from "express";
import { matchInterview } from "../controllers/match.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, matchInterview);

export default router;
