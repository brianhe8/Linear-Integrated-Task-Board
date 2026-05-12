import { RequestHandler } from "express";

import * as mainRouteService from "#services/mainRoute.js";

const mainRoute: RequestHandler = (req, res) => {
  const requestTime = req.requestTime ?? "unknown";
  res.send(mainRouteService.mainRouteMessage(requestTime));
};

export { mainRoute };
