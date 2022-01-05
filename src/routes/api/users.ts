import { Router } from "express";
import {
  routeProtector,
  secureRequest,
} from "../../middleware/route-protector";
import { deleteTagsByIdAndTagTitles } from "./users/middle-ware/delete.users";
import {
  getCoursesByUserId,
  getInterestsByUserId,
  getInterestsByUserIdMe,
  getRequestingUser,
  getUserById,
} from "./users/middle-ware/get.users";
import { updateUserJobTitleDepartment } from "./users/middle-ware/patch.users";
import { updateUserInterestTags } from "./users/middle-ware/post.users";
import {
  getParamIdValidator,
  newInterestTagValidator,
  patchUserProfileJobTitleDepartmentValidator,
  validate,
} from "./validators";

const router: Router = Router();

router.get(
  "/:id",
  routeProtector,
  secureRequest,
  getParamIdValidator(),
  validate,
  getRequestingUser,
  getUserById
);

router.post(
  "/:id/interests",
  routeProtector,
  secureRequest,
  [...getParamIdValidator(), ...newInterestTagValidator()],
  validate,
  updateUserInterestTags
);

router.get(
  "/:id/interests",
  routeProtector,
  secureRequest,
  getParamIdValidator(),
  validate,
  getInterestsByUserIdMe,
  getInterestsByUserId
);

router.get(
  "/:id/courses",
  routeProtector,
  secureRequest,
  getParamIdValidator(),
  validate,
  getCoursesByUserId
);

router.delete(
  "/:id/interests",
  routeProtector,
  secureRequest,
  [...getParamIdValidator(), ...newInterestTagValidator()],
  validate,
  deleteTagsByIdAndTagTitles
);

router.patch(
  "/:id/profile",
  routeProtector,
  secureRequest,
  [...getParamIdValidator(), patchUserProfileJobTitleDepartmentValidator()],
  validate,
  updateUserJobTitleDepartment
);

router.patch(
  "/:id/follow",
  routeProtector,
  secureRequest,
  [...getParamIdValidator()],
  validate
);

export default router;
