import { Router } from "express";

import { mainRoute } from "#controllers/mainRoute.js";

const router = Router();

router.get("/", mainRoute);

export default router;
