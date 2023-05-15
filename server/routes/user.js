import { Router } from "express";
import { createUser } from "../controllers/user/post.js";
import { updateUser } from "../controllers/user/patch.js";
import { getAllUsers, getUserById } from "../controllers/user/get.js";
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