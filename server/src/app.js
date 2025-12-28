import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import matchRoutes from "./routes/match.routes.js";
import confirmRoutes from "./routes/confirm.routes.js";
import requestRoutes from "./routes/request.routes.js";
import userRoutes from "./routes/user.routes.js";
import interviewRoutes from "./routes/interview.routes.js";





const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/availability", availabilityRoutes);
app.use("/match", matchRoutes);
app.use("/confirm", confirmRoutes);
app.use("/requests", requestRoutes);
app.use("/users", userRoutes);
app.use("/interviews", interviewRoutes);


export default app;
