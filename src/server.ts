import express, { Request, Response } from "express";
import userRouter from "./routes/User.router";
import testRouter from "./routes/Test.router";
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/test", testRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running.");
});

export default app;
