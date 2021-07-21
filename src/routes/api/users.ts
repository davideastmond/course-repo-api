import { Router } from "express";
import { routeProtector } from "../../middleware/route-protector";
import { deleteTagsByIdAndTagTitles } from "./users/middle-ware/delete.users";
import {
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
  getParamIdValidator(),
  validate,
  getRequestingUser,
  getUserById
);

router.post(
  "/:id/interests",
  routeProtector,
  [...getParamIdValidator(), ...newInterestTagValidator()],
  validate,
  updateUserInterestTags
);

router.get(
  "/:id/interests",
  routeProtector,
  getParamIdValidator(),
  validate,
  getInterestsByUserIdMe,
  getInterestsByUserId
);

router.delete(
  "/:id/interests",
  routeProtector,
  [...getParamIdValidator(), ...newInterestTagValidator()],
  validate,
  deleteTagsByIdAndTagTitles
);

router.patch(
  "/:id/profile",
  routeProtector,
  [...getParamIdValidator(), patchUserProfileJobTitleDepartmentValidator()],
  validate,
  updateUserJobTitleDepartment
);
export default router;
