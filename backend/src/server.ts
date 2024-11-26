const express = require("express");
import { Request, Response } from "express";
import { connectDB } from "./dbconfig";
import { User } from "./schemas/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import cors from "cors";
import { JWT_SECRET } from "./configs";
import { contentRoute } from "./routes/content.route";
import { Type } from "./schemas/Type";

const jwtSecret = JWT_SECRET;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/content", contentRoute);
//-----------User--------------------//
app.post("/user/register", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (!email || !username || !password) {
    res.status(400).json({ message: "Please provide all the fields" });
    return;
  }
  const user = new User({ email, username, password: hashedPassword });
  const response = await user.save();
  res.status(201).json({
    message: "User created successfully",
    _id: response._id,
    email: response.email,
    username: response.username,
  });
});

app.post("/user/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("user found!");
  const passwordMatch = bcrypt.compareSync(password, user?.password);
  if (!user || !passwordMatch) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    jwtSecret,
    { expiresIn: "3d" }
  );
  res.status(200).json({ message: "Login Successful", token });
});

//-----------Type--------------------//
app.post("/type/new", async (req: Request, res: Response) => {
  const { name } = req.body;
  const typeExists = await Type.findOne({ name });
  if (typeExists) {
    res.status(400).json({ message: "Type already exists" });
    return;
  }
  const newType = new Type({ name });
  const response = await newType.save();
  res.status(201).json({ message: "Type created successfully", response });
});
app.get("/type/all", async (req: Request, res: Response) => {
  const types = await Type.find();
  res.status(200).json({ message: "Types fetched successfully", types });
});

//-----------Content--------------------//
app.post("/content/new", async (req: Request, res: Response) => {
  const { title, content, tags, type } = req.body;
  console.log(tags);
  const { token } = req.headers;
  console.log("token", token);
  const { email } = jwt.verify(token, jwtSecret);
  if (!email) {
    res.status(401).json({ message: "Please Login to create content." });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }
  if (!content) {
    res.status(400).json({ message: "Please provide content" });
    return;
  }
  const resolvedTags = await findOrCreateTags(tags);
  console.warn("resolvedTags: ", resolvedTags);

  const resolvedType = await Type.findOne({ name: type });
  if (!resolvedType) {
    res.status(400).json({ message: "Invalid Type" });
    return;
  }
  const newContent = new Content({
    title: title,
    content: content,
    author: user._id,
    tags: resolvedTags,
    type: resolvedType._id,
  });
  const response = await newContent.save();
  return res.status(201).json({
    message: "Content created successfully",
    response,
  });
});

// app.get("/content/all", async (req: Request, res: Response) => {
//   const { token } = req.headers;
//   const { id } = jwt.verify(token, jwtSecret);
//   console.warn("id: ", id);
//   const content = await Content.find()
//     .populate("tags", "name")
//     .populate("type", "name");
//   res.status(200).json({ message: "Content fetched successfully", content });
// });

app.listen(3000, () => {
  connectDB().then(() => console.log("Server runing on port 3000"));
});
