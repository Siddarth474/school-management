import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import courseRouter from "./modules/courses/course.routes.js";
import enrollRouter from "./modules/enrollment/enroll.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

app
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(cookieParser())

app
.use("/api/auth", authRouter)
.use("/api/course", courseRouter)
.use("/api/enroll", enrollRouter)
.use("/api/admin", adminRouter)

app.use(errorMiddleware);

export default app;