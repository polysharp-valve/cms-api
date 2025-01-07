import { eq } from "drizzle-orm";

import db from "@/database/database";
import { Folder, folder } from "@/database/schemas/folder";
import logger from "@/helpers/logger";

export default abstract class FolderService {
  public static async create(data: Folder["Insert"]) {
    try {
      const folderCreated = await db.insert(folder).values(data).returning();

      if (!folderCreated.length) {
        return null;
      }

      return folderCreated[0];
    } catch (error) {
      logger.error("[FolderService.create] - unexpected error");
      throw error;
    }
  }

  public static async find() {
    try {
      const folders = await db.select().from(folder);

      return folders;
    } catch (error) {
      logger.error("[FolderService.find] - unexpected error");
      throw error;
    }
  }

  public static async findOne(id: string) {
    try {
      const folderFound = await db
        .select()
        .from(folder)
        .where(eq(folder.id, id))
        .limit(1);

      if (!folderFound.length) {
        return null;
      }

      return folderFound[0];
    } catch (error) {
      logger.error("[FolderService.findOne] - unexpected error");
      throw error;
    }
  }

  public static async update(id: string, data: Folder["Update"]) {
    try {
      const folderUpdated = await db
        .update(folder)
        .set(data)
        .where(eq(folder.id, id))
        .returning();

      if (!folderUpdated.length) {
        return null;
      }

      return folderUpdated[0];
    } catch (error) {
      logger.error("[FolderService.update] - unexpected error");
      throw error;
    }
  }

  public static async remove(id: string) {
    try {
      const folderDeleted = await db
        .delete(folder)
        .where(eq(folder.id, id))
        .returning();

      if (!folderDeleted.length) {
        return null;
      }

      return folderDeleted[0];
    } catch (error) {
      logger.error("[FolderService.remove] - unexpected error");
      throw error;
    }
  }
}
