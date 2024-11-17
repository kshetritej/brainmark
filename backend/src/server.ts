const express = require("express");
import { Request, Response } from "express";
import { connectDB } from "./dbconfig";
import { User } from "./schemas/User";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.post("/users", (req: Request, res: Response) => {
  console.log("body", req.body);
  const { email, username, password } = req.body;
  const user = new User({
    email,
    username,
    password,
  });
  user.save();

  res.json({ message: "User created successfully" });
});

app.listen(3000, () => {
  connectDB().then(() => console.log("Server runing on port 3000"));
});
