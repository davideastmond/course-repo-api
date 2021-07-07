require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import connectDB from "../config/database";
import auth from "./routes/api/auth";
import courses from "./routes/api/courses";
import passport from "passport";
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();

// Connect to MongoDB
connectDB();

console.log("Cookies", process.env.COOKIE1, process.env.COOKIE2);
// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // Day
    name: "course-repo",
    keys: [process.env.COOKIE1, process.env.COOKIE2],
    domain: "localhost",
    // secure: isProduction
  })
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

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
