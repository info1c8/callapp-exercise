import fs from "fs";
import { dataPath } from "../../utils/path.js";

export const deleteUserById = (req, res) => {
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
}

export const deleteAllUsers = (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "An error occurred while reading the data",
      });
    }

    const users = JSON.parse(data);

    fs.writeFile(dataPath, JSON.stringify([]), (err) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "An error occurred while writing the data",
        });
      } else {
        console.log("123");
        res.status(204).json({
          status: "success",
          count: users.length,
          message: "All users have been deleted",
        });
      }
    });
  });
}