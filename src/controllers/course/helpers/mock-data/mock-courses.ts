import {
  CourseCreationData,
  CourseCategory,
} from "../../../../models/course/course.types";
import mongoose from "mongoose";

export const MOCK_COURSES: CourseCreationData[] = [
  {
    category: CourseCategory.Engineering,
    postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
    title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
    url: "https://www.udemy.com/course/complete-python-bootcamp/",
    description:
      "Learn to use Python professionally, learning both Python 2 and Python 3!",
    reviews: {},
    rating: 4,
    likes: {},
    tags: ["bootcamp", "python2", "python3"],
  },
  {
    category: CourseCategory.Design,
    postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
    title: "User Experience Design Essentials - Adobe XD UI UX Design",
    url: "https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/",
    description:
      "Use XD to get a job in UI Design, User Interface, User Experience design, UX design & Web Design",
    reviews: {},
    rating: 4,
    likes: {},
    tags: ["wireframe", "UX"],
  },
  {
    category: CourseCategory.HumanResources,
    postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
    title: "Administrative Human Resources",
    url: "https://www.linkedin.com/learning/administrative-human-resources/welcome",
    description:
      "Course instructor considers the role of HR professional, conduct audits, and outline key responsibilities.",
    reviews: {
      "60e4780446e78b15614b4a3a": "Learned a lot from this",
    },
    rating: 4,
    likes: {},
    tags: ["wireframe", "UX"],
  },
  {
    category: CourseCategory.Sales,
    postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
    title: "Sales: Closing Strategies",
    url: "https://www.linkedin.com/learning/sales-closing-strategies/strategies-for-closing-sales",
    description:
      "Learn how to nurture the relationship with your buyer, overcome obstacles, recognize buying signals, and ask for the business.",
    reviews: {},
    rating: 5,
    likes: {},
    tags: ["sales", "Deal closure"],
  },
];

export const MOCK_COURSES_2: CourseCreationData[] = [
  {
    category: CourseCategory.Sales,
    postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
    title: "Becoming Head of Sales",
    url: "https://www.linkedin.com/learning/becoming-head-of-sales-developing-your-playbook/the-road-to-head-of-sales",
    description: "Learn sales leadership and strategic plans",
    reviews: {},
    rating: 3,
    likes: {},
    tags: [],
  },
  {
    category: CourseCategory.Product,
    postedByUserId: mongoose.Types.ObjectId("60e4ce787ce8093a97d9715f"),
    title: "Product Management: Building a Product Roadmap",
    url: "https://www.linkedin.com/learning/product-management-building-a-product-roadmap",
    description:
      "This course shows how to build a product roadmap for your business—and gain critical stakeholder buy-in. See examples of what roadmaps might look like, and spend time learning the tools and techniques necessary to map the projects for your specific organization.",
    reviews: {},
    rating: 4,
    likes: {},
    tags: ["Road map"],
  },
  {
    category: CourseCategory.Marketing,
    postedByUserId: mongoose.Types.ObjectId("60e83c8e4e467d0be01d243e"),
    title: "Marketing Tools: Automation",
    url: "https://www.linkedin.com/learning/marketing-tools-automation",
    description:
      "This course provides guidance on how to pick the right marketing automation tool for your company, and use it effectively to automate time-consuming marketing tasks.",
    reviews: {
      "60e4780446e78b15614b4a3a": "Learned a lot from this",
    },
    rating: 4,
    likes: {},
    tags: ["Marketing", "automation", "Active Campaign"],
  },
  {
    category: CourseCategory.Engineering,
    postedByUserId: mongoose.Types.ObjectId("60e477c746e78b15614b4a34"),
    title: "Databases for Node.js Developers",
    url: "https://www.linkedin.com/learning/databases-for-node-js-developers-2",
    description:
      "In this course, learn about the various database options available for Node.js applications, so that you can select the right database for your app.",
    reviews: {},
    rating: 3,
    likes: {},
    tags: ["databases"],
  },
];
