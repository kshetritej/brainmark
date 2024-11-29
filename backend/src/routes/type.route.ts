import { Request, Response, Router } from "express";
import { Type } from "../schemas/Type";

const typeRoute = Router();

typeRoute.post("/new", async (req: Request, res: Response) => {
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
typeRoute.get("/all", async (req: Request, res: Response) => {
  const types = await Type.find();
  res.status(200).json({ message: "Types fetched successfully", types });
});

export default typeRoute;