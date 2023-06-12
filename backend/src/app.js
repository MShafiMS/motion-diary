import cors from "cors";
import express from "express";
import blogRoute from "./app/modules/blogs/blog.route.js";
import userRoute from "./app/modules/users/user.route.js";

const app = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2/users/", userRoute);
app.use("/api/v2/blogs/", blogRoute);
//Testing
app.get("/", async (req, res) => {
  res.send("Motion Diary Server!!💽");
});

export default app;
