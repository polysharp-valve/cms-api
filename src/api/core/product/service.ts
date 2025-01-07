import { eq } from "drizzle-orm";

import db from "@/database/database";
import { product, Product } from "@/database/schemas/product";

export default abstract class ProductService {
  public static async create(data: Product["Insert"]) {
    const productCreated = await db.insert(product).values(data).returning();

    if (!productCreated.length) {
      return null;
    }

    return productCreated[0];
  }

  public static async find() {
    const products = await db.select().from(product);

    return products;
  }

  public static async findOne(id: string) {
    const productFound = await db
      .select()
      .from(product)
      .where(eq(product.id, id))
      .limit(1);

    if (!productFound.length) {
      return null;
    }

    return productFound[0];
  }

  public static async update(id: string, data: Product["Update"]) {
    const productUpdated = await db
      .update(product)
      .set(data)
      .where(eq(product.id, id))
      .returning();

    if (!productUpdated.length) {
      return null;
    }

    return productUpdated[0];
  }

  public static async remove(id: string) {
    const productDeleted = await db
      .delete(product)
      .where(eq(product.id, id))
      .returning();

    if (!productDeleted.length) {
      return null;
    }

    return productDeleted[0];
  }
}
