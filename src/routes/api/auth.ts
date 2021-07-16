import { Router, Response } from "express";

import { logoutIfAuthenticated, logUserOut } from "../../middleware/auth";

import Request from "../../types/Request";

import passport from "passport";
import GooglePassportStrategy from "../../auth-strategies/google-passport-strategy";
import { routeProtector } from "../../middleware/route-protector";
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
  (req: Request, res: Response) => {
    res.redirect("/success");
  }
);

router.get("/", routeProtector, (req, res) => {
  res.status(200).send({ authed: true, user: req.user });
});

router.post("/logout", logUserOut);

export default router;
