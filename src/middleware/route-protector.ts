/* eslint-disable require-jsdoc */
import { Request, Response, NextFunction } from "express";
export function routeProtector(req: any, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.status(401).send({ error: "unauthorized: protected route" });
  }
}
