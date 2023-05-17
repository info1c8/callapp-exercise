import { Router } from "express";
import { createUser } from "../controllers/user/create.js";
import { updateUser } from "../controllers/user/update.js";
import { getAllUsers, getUserById } from "../controllers/user/read.js";
import { deleteAllUsers, deleteUserById } from "../controllers/user/delete.js";

export const userRouter = Router();

userRouter.route("/users")
  .get(getAllUsers)
  .post(createUser)
  .delete(deleteAllUsers);

userRouter.route("/users/:userId")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUserById);