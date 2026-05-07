import { Router } from "express";

import { getAllIssuesFromProject } from "#controllers/linear.js";
const router = Router();

router.get("/", getAllIssuesFromProject);

export default router;
