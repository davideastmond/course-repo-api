import { Router } from "express";
import { routeProtector } from "../../middleware/route-protector";
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
  getAllCoursesLimitSkipBodyValidator(),
  validate,
  retrieveAllCoursesFromDb
);

router.get("/:id", getParamIdValidator(), validate, getCourseDetailById);

router.post(
  "/",
  routeProtector,
  postNewCourseValidator(),
  categoryParamSanitizer(),
  validate,
  createCourseRecommendation
);

export default router;
