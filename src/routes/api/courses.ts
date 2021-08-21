import { Router } from "express";
import { routeProtector } from "../../middleware/route-protector";
import {
  getCourseDetailById,
  retrieveCoursesFromDb,
} from "./courses/middle-ware/get.courses";
import { createCourseRecommendation } from "./courses/middle-ware/post.courses";
import {
  categoryParamSanitizer,
  getAllCoursesLimitSkipQueryTypeBodyValidator,
  getParamIdValidator,
  postNewCourseValidator,
  validate,
} from "./validators";

const router: Router = Router();

router.get(
  "/",
  getAllCoursesLimitSkipQueryTypeBodyValidator(),
  validate,
  retrieveCoursesFromDb
);

router.get("/:id", getParamIdValidator(), validate, getCourseDetailById);
router.get(
  "/user",
  routeProtector,
  getAllCoursesLimitSkipQueryTypeBodyValidator(),
  validate
);
router.post(
  "/",
  routeProtector,
  postNewCourseValidator(),
  categoryParamSanitizer(),
  validate,
  createCourseRecommendation
);

export default router;
