import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Setup express app
const app = express();
const { PORT } = process.env || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Route middleware
app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});