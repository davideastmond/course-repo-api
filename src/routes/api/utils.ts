import { Router } from "express";
import {
  routeProtector,
  secureRequest,
} from "../../middleware/route-protector";
import { attemptToAutoCompleteFromURL } from "./utils/middle-ware/post.utils";
import { utilsURLValidator, validate } from "./validators";

const router: Router = Router();

router.post(
  "/courses/auto_complete",
  routeProtector,
  secureRequest,
  utilsURLValidator(),
  validate,
  attemptToAutoCompleteFromURL
);

export default router;
