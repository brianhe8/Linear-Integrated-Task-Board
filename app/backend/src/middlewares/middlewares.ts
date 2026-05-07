import { RequestHandler } from "express";

const auth: RequestHandler = (req, _res, next) => {
  if (req.params.id === "2") {
    next();
  }
};
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

export { auth, myLogger, requestLogger, requestTime };
