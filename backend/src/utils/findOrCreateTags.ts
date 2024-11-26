import { Tag } from "../schemas/Tag";

export async function findOrCreateTags(tags: string[]) {
  const tagIds = await Promise.all(
    tags.map(async (tag: string) => {
      if (!tag) {
        return;
      }
      const existingTag = await Tag.findOne({ name: tag });
      if (existingTag) return existingTag._id;

      const newTag = new Tag({ name: tag });
      const response = await newTag.save();
      return response._id;
    })
  );
  return tagIds.filter((tagId) => tagId !== null);
}
