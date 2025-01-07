import { eq } from "drizzle-orm";

import db from "@/database/database";
import { Folder, folder } from "@/database/schemas/folder";

export default abstract class FolderService {
  public static async create(data: Folder["Insert"]) {
    const folderCreated = await db.insert(folder).values(data).returning();

    if (!folderCreated.length) {
      return null;
    }

    return folderCreated[0];
  }

  public static async find() {
    const folders = await db.select().from(folder);

    return folders;
  }

  public static async findOne(id: string) {
    const folderFound = await db
      .select()
      .from(folder)
      .where(eq(folder.id, id))
      .limit(1);

    if (!folderFound.length) {
      return null;
    }

    return folderFound[0];
  }

  public static async update(id: string, data: Folder["Update"]) {
    const folderUpdated = await db
      .update(folder)
      .set(data)
      .where(eq(folder.id, id))
      .returning();

    if (!folderUpdated.length) {
      return null;
    }

    return folderUpdated[0];
  }

  public static async remove(id: string) {
    const folderDeleted = await db
      .delete(folder)
      .where(eq(folder.id, id))
      .returning();

    if (!folderDeleted.length) {
      return null;
    }

    return folderDeleted[0];
  }
}
