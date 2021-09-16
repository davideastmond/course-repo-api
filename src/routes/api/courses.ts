import { Router } from "express";
import {
  routeProtector,
  secureRequest,
} from "../../middleware/route-protector";
import {
  getCourseDetailById,
  retrieveAllCoursesFromDb,
} from "./courses/middle-ware/get.courses";
import { createCourseRecommendation } from "./courses/middle-ware/post.courses";
import {
  categoryParamSanitizer,
  getAllCoursesLimitSkipBodyValidator,
  getParamIdValidator,
  postNewCourseValidator,
  validate,
} from "./validators";

const router: Router = Router();

router.get(
  "/",
  secureRequest,
  getAllCoursesLimitSkipBodyValidator(),
  validate,
  retrieveAllCoursesFromDb
);

router.get("/:id", getParamIdValidator(), validate, getCourseDetailById);

router.post(
  "/",
  secureRequest,
  routeProtector,
  postNewCourseValidator(),
  categoryParamSanitizer(),
  validate,
  createCourseRecommendation
);

export default router;
