require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import connectDB from "../config/database";
import auth from "./routes/api/auth";
import courses from "./routes/api/courses";
import users from "./routes/api/users";
import search from "./routes/api/search";
import utils from "./routes/api/utils";
import passport from "passport";
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();

const isProduction = !(
  process.env.NODE_ENV && process.env.NODE_ENV.match("development")
);

console.log("isProduction? ", isProduction);
const DOMAIN = isProduction
  ? process.env.PRODUCTION_COOKIE_DOMAIN
  : process.env.DEV_COOKIE_DOMAIN;

console.log("COOKIE DOMAIN is:", DOMAIN);
connectDB();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (isProduction) {
  app.set("trust proxy", 1);
}

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000, // Day
  name: "course-repo",
  keys: [process.env.COOKIE1, process.env.COOKIE2],
  domain: DOMAIN,
};
app.use(
  isProduction
    ? cookieSession({ ...cookieOptions, secure: true, sameSite: "none" })
    : cookieSession(cookieOptions)
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => {
  res.send("API Running");
});

app.get("/success", (req: any, res) => {
  res.send(`<script>window.close()</script>`);
});

app.use("/api/auth", auth);
app.use("/api/courses", courses);
app.use("/api/users", users);
app.use("/api/search", search);
app.use("/api/utils", utils);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
