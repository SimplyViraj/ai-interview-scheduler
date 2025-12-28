import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import confirmRoutes from "./routes/confirm.routes.js";
import requestRoutes from "./routes/request.routes.js";
import userRoutes from "./routes/user.routes.js";
import interviewRoutes from "./routes/interview.routes.js";

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/availability", availabilityRoutes);
app.use("/confirm", confirmRoutes);
app.use("/requests", requestRoutes);
app.use("/users", userRoutes);
app.use("/interviews", interviewRoutes);

app.get("/", (req, res) => {
  res.send("AI Interview Scheduler API running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    console.log("SENDGRID_FROM_EMAIL =", process.env.SENDGRID_FROM_EMAIL);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

export default app;
