import db from "@/database/database";
import { media, Media } from "@/database/schemas/media";
import { blobStorage } from "@/helpers/storage";
import { eq } from "drizzle-orm";

export default abstract class MediaService {
  public static async create(data: Media["Insert"]) {
    const mediaCreated = await db.insert(media).values(data).returning();

    if (!mediaCreated.length) {
      return null;
    }

    return mediaCreated[0];
  }

  public static async uploadMedia(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileUrl = await blobStorage.upload(buffer);

    if (!fileUrl) {
      return null;
    }

    return fileUrl;
  }

  public static async find(folderId?: string) {
    const query = db.select().from(media);

    if (folderId) {
      query.where(eq(media.folderId, folderId));
    }

    const mediaFound = await query;

    return mediaFound;
  }

  public static async findOne(mediaId: string) {
    const mediaFound = await db
      .select()
      .from(media)
      .where(eq(media.id, mediaId));

    if (!mediaFound.length) {
      return null;
    }

    return mediaFound[0];
  }

  public static async update(mediaId: string, data: Media["Update"]) {
    const mediaUpdated = await db
      .update(media)
      .set(data)
      .where(eq(media.id, mediaId))
      .returning();

    if (!mediaUpdated.length) {
      return null;
    }

    return mediaUpdated[0];
  }

  public static async remove(mediaId: string) {
    const mediaRemoved = await db
      .delete(media)
      .where(eq(media.id, mediaId))
      .returning();

    if (!mediaRemoved.length) {
      return null;
    }

    return mediaRemoved[0];
  }
}
