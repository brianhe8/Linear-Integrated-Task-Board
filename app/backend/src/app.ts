import cors from "cors";
import express from "express";

import {
  myLogger,
  requestLogger,
  requestTime,
} from "./middlewares/middlewares.js";
import linearRouter from "./routes/linear.js";
import userRouter from "./routes/user.js";

const app = express();
const port = process.env.PORT ?? "9001";

app.use(cors());
app.use(express.json());
app.use(myLogger);
app.use(requestLogger);
app.use(requestTime);
console.log("hello");

app.get("/", (req, res) => {
  let responseText = "hello world!<br>";
  console.log("hello");
  responseText += `<small>Requested at: ${req.requestTime ?? "unknown"}</small>`;
  res.redirect("/user");
  res.send(responseText);
});
app.use("/user", userRouter);
app.use("/linear", linearRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
