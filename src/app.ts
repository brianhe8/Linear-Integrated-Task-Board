import cors from "cors";
import express from "express";

import { linearGraphQL } from "#external/linear.js";
import { myLogger, requestLogger } from "#middlewares/middlewares.js";
import userRouter from "#routes/user.js";

const app = express();
const port = process.env.PORT ?? "9001";

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", myLogger);
app.use("/user", userRouter);

app.get("/linear/me", async (_req, res) => {
  try {
    const data = await linearGraphQL<{
      viewer: { email: string; id: string; name: string };
    }>(`
      query Viewer {
        viewer {
          id
          name
          email
        }
      }
    `);

    res.json(data.viewer);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
