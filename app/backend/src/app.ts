import cors from "cors";
import express from "express";

import { errorHandler } from "#middlewares/errorHandler.js";
import {
  myLogger,
  requestLogger,
  requestTime,
} from "#middlewares/middlewares.js";
import linearRouter from "#routes/linear.js";
import mainRouter from "#routes/mainRoute.js";
import userRouter from "#routes/user.js";

const app = express();
const port = process.env.PORT ?? "9001";

app.use(cors());
app.use(express.json());
app.use(myLogger);
app.use(requestLogger);
app.use(requestTime);
console.log("hello");

app.get("/", mainRouter);
app.use("/user", userRouter);
app.use("/linear", linearRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
