import { Router } from "express";
import { CourseModel } from "../../models/course/course.model";

const router: Router = Router();

router.get("/", async (req: any, res: any) => {
  try {
    const coursesData = await CourseModel.find();
    return res.status(200).send(coursesData);
  } catch (exception) {
    return res.status(500).send({
      error: exception.message,
    });
  }
});

router.post("/", async (req: any, res: any) => {
  return res.status(200).send("POST courses OK");
});

router.post("/test", async (req: any, res: any) => {
  // A route to fill DB
  res.status(200).send("OK");
});
export default router;
