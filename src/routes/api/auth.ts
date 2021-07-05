import bcrypt from "bcryptjs";
import config from "config";
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

import auth, { logoutIfAuthenticated } from "../../middleware/auth";
// import Payload from "../../types/Payload";
import Request from "../../types/Request";

import passport from "passport";
import GooglePassportStrategy from "../../auth-strategies/google-passport-strategy";
const router: Router = Router();

passport.use("google", GooglePassportStrategy);
router.get(
  "/google",
  logoutIfAuthenticated,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (_req: Request, res: Response) => {
    res.redirect("/success");
  }
);

export default router;
