/* eslint-disable require-jsdoc */
import { Request, Response, NextFunction } from "express";
export function routeProtector(req: any, res: Response, next: NextFunction) {
  console.log(new Date(), "route protector hit", req.user);
  if (req.user) {
    next();
  } else {
    res.status(401).send({ error: "unauthorized: protected route" });
  }
}
