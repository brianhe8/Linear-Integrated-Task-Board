import cors from "cors";
import express from "express";

import { middleware } from "#middlewares/middlewares.js";

const app = express();
const port = process.env.PORT ?? "9001";

app.use(cors());
app.use(express.json()); // CORS stuff, dont really understand it yet

app.get("/", middleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
