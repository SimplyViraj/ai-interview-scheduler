import express from "express";
import { confirmInterview } from "../controllers/confirm.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, confirmInterview);

export default router;
