import express, { Request, Response } from "express";
import { postUser } from "../controllers/users.js";

const userRouter = express.Router();

// Health check route
userRouter.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy" });
});

// POST user to the DynamoDB table
userRouter.post("/users", postUser);

export default userRouter;
