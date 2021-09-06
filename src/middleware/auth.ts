import { Response, NextFunction } from "express";
import Request from "../types/Request";

export function logoutIfAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.logOut();
  next();
}

export function logUserOut(req: any, res: any) {
  req.logOut();
  return res.status(200).send({ status: "ok" });
}
