import { eq } from "drizzle-orm";

import db from "@/database/database";

import { Categories, categories } from "./categories.schema";

export default abstract class CategoriesService {
  public static async exists(id: string): Promise<boolean> {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    return category.length > 0;
  }

  public static async findAll() {
    return db.select().from(categories);
  }

  public static async create(category: Categories["Insert"]) {
    const inserted = await db.insert(categories).values(category).returning();
    return inserted[0];
  }

  public static async update(id: string, category: Categories["Update"]) {
    const updated = await db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();

    return updated[0];
  }

  public static async remove(id: string) {
    await db.delete(categories).where(eq(categories.id, id));
  }
}
