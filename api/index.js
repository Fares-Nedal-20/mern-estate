import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected on db");
});

app.listen(3000, () => {
  console.log("app is listening in port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const message = err.message || "Something went wrong";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
