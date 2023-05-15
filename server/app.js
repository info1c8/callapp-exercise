import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const { PORT } = process.env;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});