import { RequestHandler } from "express";

import * as linearService from "#services/linear.js";

const getAllIssuesFromProject: RequestHandler = async (_req, res) => {
  try {
    const issues = await linearService.getAllIssuesFromProject();
    res.json(issues);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
export { getAllIssuesFromProject };
