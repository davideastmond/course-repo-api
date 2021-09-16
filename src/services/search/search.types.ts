import { ICourse } from "../../models/course/course.types";
import { ISecureAdaptedUser } from "../../models/user/user.types";

export type ISearchResults = {
  courses: ICourse[];
  users: ISecureAdaptedUser[];
};
