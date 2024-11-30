import { Request, Response, Router } from "express";
import { Tag } from "../schemas/Tag";

const tagRoute = Router();

tagRoute.get("/all", async (req: Request, res: Response) => {
  const tags = await Tag.find();
  res.status(200).json({ message: "Tags fetched successfully", tags });
});

export default tagRoute;
