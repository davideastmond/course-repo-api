import { Router } from "express";
import { retrieveAllCoursesFromDb } from "./courses/middle-ware/get.courses";
import {
  createCourseRecommendation,
  createDummyCourses,
  findCourses,
} from "./courses/middle-ware/post.courses";
import { postNewCourseValidator, validate } from "./validators";

const router: Router = Router();

router.get("/", retrieveAllCoursesFromDb);

router.post("/test", findCourses, createDummyCourses);
router.post(
  "/",
  postNewCourseValidator(),
  validate,
  createCourseRecommendation
);
export default router;
