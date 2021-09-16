/* eslint-disable require-jsdoc */
require("dotenv").config();
import { Response, NextFunction } from "express";
export function routeProtector(req: any, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.status(401).send({ error: "unauthorized: protected route" });
  }
}

export function secureRequest(req: any, res: any, next: any) {
  const isProduction = !(
    process.env.NODE_ENV && process.env.NODE_ENV.match("development")
  );

  const API_TOKEN = isProduction
    ? process.env.PRODUCTION_API_TOKEN
    : process.env.DEV_API_TOKEN;

  const headerToken = req.header("API_TOKEN");
  if (headerToken === API_TOKEN) {
    next();
  } else {
    res.status(401).send({ error: "API token is missing or invalid" });
  }
}
