import express, { Request, Response } from "express";
import { postUser, getUser, deleteUser } from "../controllers/users.js";

const userRouter = express.Router();

// Health check route
userRouter.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy" });
});

// POST user to the DynamoDB table
userRouter.post("/users", postUser);

// GET user by email from the DynamoDB table
userRouter.get("/users/:email", getUser);

// DELETE user by email from the DynamoDB table
userRouter.delete("/users/:email", deleteUser);

export default userRouter;
