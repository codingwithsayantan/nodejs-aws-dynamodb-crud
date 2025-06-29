import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import usersRouter from "./routes/user.js";
import CustomError from "./error/customError.js";

const app = express();

app.use(express.json());
app.use("/api", usersRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    console.error(err.stack);
    res.status(err.statusCode).send({ message: err.message });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
