import { eq } from "drizzle-orm";

import db from "@/database/database";
import {
  ProductCollection,
  productCollection,
} from "@/database/schemas/product-collection";
import slugify from "@/helpers/slugify";

export default abstract class ProductCollectionService {
  public static async create(data: ProductCollection["Insert"]) {
    const productCollectionCreated = await db
      .insert(productCollection)
      .values({ ...data, slug: slugify(data.name) })
      .returning();

    if (!productCollectionCreated.length) {
      return null;
    }

    return productCollectionCreated[0];
  }

  public static async find() {
    const productCollectionsFound = await db.select().from(productCollection);

    return productCollectionsFound;
  }

  public static async findOne(collectionId: string) {
    const productCollectionFound = await db
      .select()
      .from(productCollection)
      .where(eq(productCollection.id, collectionId));

    if (!productCollectionFound.length) {
      return null;
    }

    return productCollectionFound[0];
  }

  public static async update(
    collectionId: string,
    data: ProductCollection["Update"],
  ) {
    const updateData = data.name ? { ...data, slug: slugify(data.name) } : data;

    const productCollectionUpdated = await db
      .update(productCollection)
      .set(updateData)
      .where(eq(productCollection.id, collectionId))
      .returning();

    if (!productCollectionUpdated.length) {
      return null;
    }

    return productCollectionUpdated[0];
  }

  public static async remove(collectionId: string) {
    const productCollectionRemoved = await db
      .delete(productCollection)
      .where(eq(productCollection.id, collectionId))
      .returning();

    // TODO: delete from products_collections

    if (!productCollectionRemoved.length) {
      return null;
    }

    return productCollectionRemoved[0];
  }
}
