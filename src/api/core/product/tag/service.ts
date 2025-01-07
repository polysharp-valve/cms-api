import { eq } from "drizzle-orm";

import db from "@/database/database";
import { productTag, ProductTag } from "@/database/schemas/product-tag";

export default abstract class ProductTagService {
  public static async create(data: ProductTag["Insert"]) {
    const productTagCreated = await db
      .insert(productTag)
      .values(data)
      .returning();

    if (!productTagCreated.length) {
      return null;
    }

    return productTagCreated[0];
  }

  public static async find() {
    const productTags = await db.select().from(productTag);

    return productTags;
  }

  public static async findOne(id: string) {
    const productTags = await db
      .select()
      .from(productTag)
      .where(eq(productTag.id, id))
      .limit(1);

    if (!productTags.length) {
      return null;
    }

    return productTags[0];
  }

  public static async update(id: string, data: ProductTag["Update"]) {
    const productTags = await db
      .update(productTag)
      .set(data)
      .where(eq(productTag.id, id))
      .returning();

    if (!productTags.length) {
      return null;
    }

    return productTags[0];
  }

  public static async remove(id: string) {
    const productTags = await db
      .delete(productTag)
      .where(eq(productTag.id, id))
      .returning();

    if (!productTags.length) {
      return null;
    }

    return productTags[0];
  }
}
