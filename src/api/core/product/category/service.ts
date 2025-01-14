import { eq } from "drizzle-orm";

import db from "@/database/database";
import {
  productCategory,
  ProductCategory,
} from "@/database/schemas/product-category";
import slugify from "@/helpers/slugify";

export default abstract class ProductCategoryService {
  public static async create(data: ProductCategory["Insert"]) {
    const slug = slugify(data.name);

    const productCategoryCreated = await db
      .insert(productCategory)
      .values({ ...data, slug })
      .returning();

    if (!productCategoryCreated.length) {
      return null;
    }

    return productCategoryCreated[0];
  }

  public static async find() {
    const productCategoriesFound = await db.select().from(productCategory);

    return productCategoriesFound;
  }

  public static async findOne(categoryId: string) {
    const productCategoryFound = await db
      .select()
      .from(productCategory)
      .where(eq(productCategory.id, categoryId));

    if (!productCategoryFound.length) {
      return null;
    }

    return productCategoryFound[0];
  }

  public static async update(
    categoryId: string,
    data: ProductCategory["Update"],
  ) {
    const updateData = data.name ? { ...data, slug: slugify(data.name) } : data;

    const productCategoryUpdated = await db
      .update(productCategory)
      .set(updateData)
      .where(eq(productCategory.id, categoryId))
      .returning();

    if (!productCategoryUpdated.length) {
      return null;
    }

    return productCategoryUpdated[0];
  }

  public static async remove(categoryId: string) {
    const productCategoryRemoved = await db
      .delete(productCategory)
      .where(eq(productCategory.id, categoryId))
      .returning();

    // TODO: Check if there are products with this category
    // TODO: Check if there are subcategories with this category

    if (!productCategoryRemoved.length) {
      return null;
    }

    return productCategoryRemoved[0];
  }
}
