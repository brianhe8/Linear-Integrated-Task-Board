import { RequestHandler } from "express";

const myLogger: RequestHandler = (_req, _res, next) => {
  console.log("LOGGED");
  next();
};

const requestLogger: RequestHandler = (req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

export { myLogger, requestLogger };
