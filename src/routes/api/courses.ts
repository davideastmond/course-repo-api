import { Router } from "express";
import { retrieveAllCoursesFromDb } from "./courses/middle-ware/get.courses";
import {
  createDummyCourses,
  findCourses,
} from "./courses/middle-ware/post.courses";

const router: Router = Router();

router.get("/", retrieveAllCoursesFromDb);

router.post("/test", findCourses, createDummyCourses);
export default router;
