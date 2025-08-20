import express, { Request, Response } from "express";
import userRouter from "./routes/User.router";
import testRouter from "./routes/Test.router";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const openApiSpecification = swaggerJSDoc({
  failOnErrors: true, //Remove
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Financee",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.router.ts"],
});

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/test", testRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running.");
});

export default app;
