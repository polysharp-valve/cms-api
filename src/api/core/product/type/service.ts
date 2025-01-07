import { eq } from "drizzle-orm";

import db from "@/database/database";
import { productType, ProductType } from "@/database/schemas/product-type";

export default abstract class ProductTypesService {
  public static async create(data: ProductType["Insert"]) {
    const productTypeCreated = await db
      .insert(productType)
      .values(data)
      .returning();

    if (!productTypeCreated.length) {
      return null;
    }

    return productTypeCreated[0];
  }

  public static async find() {
    const productTypes = await db.select().from(productType);

    return productTypes;
  }

  public static async findOne(id: string) {
    const productTypes = await db
      .select()
      .from(productType)
      .where(eq(productType.id, id))
      .limit(1);

    if (!productTypes.length) {
      return null;
    }

    return productTypes[0];
  }

  public static async update(id: string, data: ProductType["Update"]) {
    const productTypes = await db
      .update(productType)
      .set(data)
      .where(eq(productType.id, id))
      .returning();

    if (!productTypes.length) {
      return null;
    }

    return productTypes[0];
  }

  public static async remove(id: string) {
    const productTypes = await db
      .delete(productType)
      .where(eq(productType.id, id))
      .returning();

    return productTypes[0];
  }
}
