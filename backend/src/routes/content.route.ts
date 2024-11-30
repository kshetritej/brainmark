import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Content } from "../schemas/Content";
import { Type } from "../schemas/Type";
import authMiddleware, {
  AuthenticatedRequest,
} from "../middlewares/auth.middleware";
import { findOrCreateTags } from "../utils/findOrCreateTags";

export const contentRoute = Router();

contentRoute.post(
  "/new",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { title, content, tags, type } = req.body;
    const user = req?.user;
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
    console.log("author::", user.id);
    const newContent = new Content({
      title: title,
      content: content,
      author: user.id,
      tags: resolvedTags,
      type: resolvedType._id,
    });
    const response = await newContent.save();
    return res.status(201).json({
      message: "Content created successfully",
      response,
    });
  }
);

contentRoute.get(
  "/all",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const content = await Content.find({ author: user.id })
      .populate("tags", "name")
      .populate("type", "name");
    res.status(200).json({ message: "Content fetched successfully", content });
  }
);

contentRoute.delete(
  "/:id",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params;
    const user = req.user;
    const contentToDelete = await Content.findById(new ObjectId(id), {
      author: user.id,
    });
    if (contentToDelete) {
      console.log("contentToDelete", contentToDelete);
      console.log(" i was here.");
      const response = await Content.findOneAndDelete(contentToDelete._id);
      console.warn("content might be deleted.");
      return res
        .status(203)
        .json({ message: "content deleted successfully", response });
    }
  }
);

contentRoute.get(
  "/type/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const content = await Content.find({
      type: req.params.id,
      author: req.user?.id,
    }).populate("type", "name").populate("tags");
    if (!content) {
      res.status(404).json({ message: "Content not found" });
      return;
    }
    res.status(200).json({
      message: "Content fetched successfully",
      content,
    });
  }
);
