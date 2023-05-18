import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { userRouter } from "./routes/user.js";

dotenv.config();

// Setup express app
const app = express();
const { PORT } = process.env || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Route middleware
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});