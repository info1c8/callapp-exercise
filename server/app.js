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
        data: users,
      });
    }
  });
});

// Get user by ID
app.get("/api/v1/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "An error occurred while reading the data",
      });
    }

    const users = JSON.parse(data);
    const user = users.find((user) => user.id === userId);

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: `User with ID ${userId} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: user,
      });
    }
  });
});

// Create user
app.post("/api/v1/users", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "An error occurred while reading the data",
      });
    }

    const users = JSON.parse(data);
    const newId = users[users.length - 1].id + 1;
    const newUser = Object.assign({ id: newId }, req.body);

    users.push(newUser);

    fs.writeFile(dataPath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "An error occurred while writing the data",
        });
      } else {
        res.status(201).json({
          status: "success",
          data: newUser,
        });
      }
    });
  });
});

// Update user by ID
app.patch("/api/v1/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "An error occurred while reading the data",
      });
    }

    const users = JSON.parse(data);
    const userToUpdate = users.find((user) => user.id === userId);

    if (!userToUpdate) {
      return res.status(404).json({
        status: "fail",
        message: `User with ID ${userId} not found`,
      });
    }

    const index = users.indexOf(userToUpdate);
    const updatedUser = Object.assign(userToUpdate, req.body);

    users[index] = updatedUser;

    fs.writeFile(dataPath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "An error occurred while writing the data",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: updatedUser,
        });
      }
    });
  });
});

// Delete user by ID
app.delete("/api/v1/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "An error occurred while reading the data",
      });
    }

    const users = JSON.parse(data);
    const userToDelete = users.find((user) => user.id === userId);

    if (!userToDelete) {
      return res.status(404).json({
        status: "fail",
        message: `User with ID ${userId} not found`,
      });
    }

    const index = users.indexOf(userToDelete);
    users.splice(index, 1);

    fs.writeFile(dataPath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "An error occurred while writing the data",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: `User with ID ${userId} deleted successfully. The user's data has been permanently removed from our system and cannot be restored`,
        });
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});