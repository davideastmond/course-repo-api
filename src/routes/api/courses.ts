import { Router } from "express";
import {
  routeProtector,
  secureRequest,
} from "../../middleware/route-protector";
import { deleteCourseRecommendations } from "./courses/middle-ware/delete.courses";
import {
  getCourseDetailById,
  retrieveAllCoursesFromDb,
} from "./courses/middle-ware/get.courses";
import { toggleLikes } from "./courses/middle-ware/patch.courses";
import { createCourseRecommendation } from "./courses/middle-ware/post.courses";
import {
  categoryParamSanitizer,
  deleteCourseRecommendationsValidator,
  getAllCoursesLimitSkipBodyValidator,
  getParamIdValidator,
  postNewCourseValidator,
  userIdValidator,
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

router.delete(
  "/",
  secureRequest,
  routeProtector,
  deleteCourseRecommendationsValidator(),
  validate,
  deleteCourseRecommendations
);

router.patch(
  "/:id/like",
  routeProtector,
  secureRequest,
  [...getParamIdValidator()],
  validate,
  toggleLikes
);

export default router;
