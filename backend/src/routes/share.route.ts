import { Request, Response, Router } from "express";
import { Share } from "../schemas/Shares";
import { Content } from "../schemas/Content";

const shareRoute = Router();

shareRoute.post("/create-link", async (req: Request, res: Response) => {
  const token = crypto.randomUUID();
  const shareableLink = `http://localhost:5173/share/${token}`;
  const newShare = await Share.create({
    token,
    contentId: req.body.contentId,
    shareableLink,
    expire: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
  await newShare.save();

  res.status(201).json({
    message: "Link generated successfully",
    shareableLink,
  });
});

shareRoute.get("/:token", async (req: Request, res: Response) => {
  const token = req.params.token;
  if (!token) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }
  const share = await Share.findOne({ token });
  if (!share) {
    res.status(404).json({ message: "Share not found" });
    return;
  }
  if (share?.expire < Date.now()) {
    res.status(401).json({ message: "Share expired" });
    return;
  }
  const content = await Content.find({ _id: share.contentId }).populate("type", "name").populate("tags", "name");
  res.json({
    message: "Share fetched successfully",
    content,
    token,
  });
});

export default shareRoute;
