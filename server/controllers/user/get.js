import fs from "fs";
import { dataPath } from "../../utils/path.js";

export const getAllUsers = (req, res) => {
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
        users,
      });
    }
  });
}

export const getUserById = (req, res) => {
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
      res.status(200).json({ status: "success", user });
    }
  });
}