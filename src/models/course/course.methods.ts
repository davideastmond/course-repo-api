import { CourseCategory, CourseCreationData } from "./course.types";
import mongoose from "mongoose";
import { CourseModel } from "./course.model";

export async function fillWithDummyData() {
  const dummyData: CourseCreationData[] = [
    {
      category: CourseCategory.Engineering,
      postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
      courseTitle: "2021 Complete Python Bootcamp From Zero to Hero in Python",
      courseUrl: "https://www.udemy.com/course/complete-python-bootcamp/",
      description:
        "Learn to use Python professionally, learning both Python 2 and Python 3!",
      reviews: {},
      rating: 4,
      tags: ["bootcamp", "python2", "python3"],
    },
    {
      category: CourseCategory.Design,
      postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
      courseTitle: "User Experience Design Essentials - Adobe XD UI UX Design",
      courseUrl:
        "https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/",
      description:
        "Use XD to get a job in UI Design, User Interface, User Experience design, UX design & Web Design",
      reviews: {},
      rating: 4,
      tags: ["wireframe", "UX"],
    },
    {
      category: CourseCategory.HumanResources,
      postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
      courseTitle: "Administrative Human Resources",
      courseUrl:
        "https://www.linkedin.com/learning/administrative-human-resources/welcome",
      description:
        "Course instructor considers the role of HR professional, conduct audits, and outline key responsibilities.",
      reviews: {
        "60e4780446e78b15614b4a3a": "Learned a lot from this",
      },
      rating: 4,
      tags: ["wireframe", "UX"],
    },
  ];

  const dummyCourses = await CourseModel.create(dummyData);
  return dummyCourses;
}
