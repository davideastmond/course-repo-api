import { Router } from "express";

import {
  routeProtector,
  secureRequest,
} from "../../middleware/route-protector";
import {
  deleteNotificationById,
  deleteTagsByIdAndTagTitles,
} from "./users/middle-ware/delete.users";
import {
  getCoursesByUserId,
  getInterestsByUserId,
  getInterestsByUserIdMe,
  getRequestingUser,
  getUserById,
  getUserNotifications,
} from "./users/middle-ware/get.users";
import {
  dismissNotification,
  toggleFollowUser,
  updateUserJobTitleDepartment,
} from "./users/middle-ware/patch.users";
import { updateUserInterestTags } from "./users/middle-ware/post.users";
import {
  getNotificationIdValidator,
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
  validate,
  toggleFollowUser
);

router.get(
  "/:id/notifications",
  routeProtector,
  secureRequest,
  [...getParamIdValidator()],
  validate,
  getUserNotifications
);

router.patch(
  "/:id/notifications/:notificationId",
  routeProtector,
  secureRequest,
  [...getParamIdValidator(), ...getNotificationIdValidator()],
  validate,
  dismissNotification
);

router.delete(
  "/:id/notifications/:notificationId",
  routeProtector,
  secureRequest,
  [...getParamIdValidator(), ...getNotificationIdValidator()],
  validate,
  deleteNotificationById
);

export default router;
