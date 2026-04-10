import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import helmet from "helmet";
import schoolRoutes from "./routes/school.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors());

app.use(helmet());
app.use(express.json()).use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(limiter);

app.use("/api/school", schoolRoutes);

app.use(errorMiddleware);

export default app;
