import { RequestHandler } from "express";

const myLogger: RequestHandler = (_req, _res, next) => {
  console.log("LOGGED");
  next();
};
const requestLogger: RequestHandler = (req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
const requestTime: RequestHandler = (req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

export { myLogger, requestLogger, requestTime };
