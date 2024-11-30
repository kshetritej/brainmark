import { Request, Response, Router } from "express";
import { User } from "../schemas/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/envConfig";

const authRoute = Router();

authRoute.post("/register", async (req: Request, res: Response) => {
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

authRoute.post("/login", async (req: Request, res: Response) => {
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
    JWT_SECRET,
    { expiresIn: "3d" }
  );
  res.status(200).json({ message: "Login Successful", token, user });
});


export default authRoute;