import { Router } from "express";
import { getRequestingUser, getUserById } from "./users/middle-ware/get.users";
import { getParamIdValidator, validate } from "./validators";

const router: Router = Router();

router.get(
  "/:id",
  getParamIdValidator(),
  validate,
  getRequestingUser,
  getUserById
);
export default router;
