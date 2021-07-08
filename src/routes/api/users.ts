import { Router } from "express";
import { getUserById } from "./users/middle-ware/get.users";
import { getParamIdValidator, validate } from "./validators";

const router: Router = Router();

router.get("/:id", getParamIdValidator(), validate, getUserById);
export default router;
