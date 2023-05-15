import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";

dotenv.config();

// Setup express app
const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// The path to the JSON file that contains the data
const dataPath = "./data/users.json";

// Define the routes
// Get all users
app.get("/api/v1/users", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "An error occurred while reading the data",
      });
    } else {
      const users = JSON.parse(data);
      res.status(200).json({
        status: "success",
        count: users.length,
        data: {
          users,
        },
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});