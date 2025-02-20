import { eq, inArray } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

import db from "@/database/database";
import { product, Product } from "@/database/schemas/product";
import { productsCategories } from "@/database/schemas/products-categories";
import { productsCollections } from "@/database/schemas/products-collections";
import logger from "@/helpers/logger";
import { productsTags } from "@/database/schemas/products-tags";

export default abstract class ProductService {
  public static async create(
    data: Product["Insert"],
    categoryIds: string[] = [],
    collectionIds: string[] = [],
    tagIds: string[] = [],
  ): Promise<Product["Select"] | null> {
    try {
      return await db.transaction(async (trx) => {
        const [createdProduct] = await trx
          .insert(product)
          .values(data)
          .returning();

        if (!createdProduct) {
          throw new Error("Product creation failed.");
        }

        const assignEntities = async <T extends PgTable<any>>(
          entityIds: string[],
          table: T,
          mapping: (entityId: string) => Record<string, any>,
          entityName: string,
        ) => {
          if (entityIds.length) {
            const values = entityIds.map(mapping);
            const assignedEntities = await trx
              .insert(table)
              .values(values as any)
              .returning();

            if (assignedEntities.length !== entityIds.length) {
              throw new Error(
                `Failed to assign all ${entityName} to the product.`,
              );
            }
          }
        };

        await assignEntities(
          categoryIds,
          productsCategories,
          (categoryId) => ({
            productId: createdProduct.id,
            productCategoryId: categoryId,
          }),
          "categories",
        );

        await assignEntities(
          collectionIds,
          productsCollections,
          (collectionId) => ({
            productId: createdProduct.id,
            productCollectionId: collectionId,
          }),
          "collections",
        );

        await assignEntities(
          tagIds,
          productsTags,
          (tagId) => ({
            productId: createdProduct.id,
            productTagId: tagId,
          }),
          "tags",
        );

        return createdProduct;
      });
    } catch (error) {
      logger.error("Error creating product", error);
      return null;
    }
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

  public static async update(
    id: string,
    data: Product["Update"],
    categoryIds: string[] = [],
    collectionIds: string[] = [],
    tagIds: string[] = [],
  ): Promise<Product["Select"] | null> {
    try {
      let productUpdated: Product["Select"] | null = null;

      await db.transaction(async (trx) => {
        const [updatedProduct] = await trx
          .update(product)
          .set(data)
          .where(eq(product.id, id))
          .returning();

        if (!updatedProduct) {
          throw new Error("Product not found");
        }

        const updateEntities = async <T extends PgTable<any>>(
          entityIds: string[],
          table: T,
          existingEntities: { productId: string; [key: string]: any }[],
          entityKey: string,
          mapping: (entityId: string) => Record<string, any>,
        ) => {
          const existingEntityIds = new Set(
            existingEntities.map((entity) => entity[entityKey]),
          );

          const entitiesToRemove = existingEntities.filter(
            (entity) => !entityIds.includes(entity[entityKey]),
          );

          const entitiesToAdd = entityIds.filter(
            (id) => !existingEntityIds.has(id),
          );

          if (entitiesToRemove.length) {
            await trx.delete(table).where(
              inArray(
                table[entityKey as keyof T["_"]["columns"]] as any,
                entitiesToRemove.map((entity) => entity[entityKey]),
              ),
            );
          }

          if (entitiesToAdd.length) {
            await trx.insert(table).values(entitiesToAdd.map(mapping) as any);
          }
        };

        await updateEntities(
          categoryIds,
          productsCategories,
          await trx
            .select()
            .from(productsCategories)
            .where(eq(productsCategories.productId, updatedProduct.id)),
          "productCategoryId",
          (categoryId) => ({
            productId: updatedProduct.id,
            productCategoryId: categoryId,
          }),
        );

        await updateEntities(
          collectionIds,
          productsCollections,
          await trx
            .select()
            .from(productsCollections)
            .where(eq(productsCollections.productId, updatedProduct.id)),
          "productCollectionId",
          (collectionId) => ({
            productId: updatedProduct.id,
            productCollectionId: collectionId,
          }),
        );

        await updateEntities(
          tagIds,
          productsTags,
          await trx
            .select()
            .from(productsTags)
            .where(eq(productsTags.productId, updatedProduct.id)),
          "productTagId",
          (tagId) => ({
            productId: updatedProduct.id,
            productTagId: tagId,
          }),
        );

        productUpdated = updatedProduct;
      });

      return productUpdated;
    } catch (error) {
      logger.error("Error updating product", error);
      return null;
    }
  }

  public static async remove(id: string): Promise<Product["Select"] | null> {
    try {
      return await db.transaction(async (trx) => {
        await trx
          .delete(productsCategories)
          .where(eq(productsCategories.productId, id));

        await trx
          .delete(productsCollections)
          .where(eq(productsCollections.productId, id));

        await trx.delete(productsTags).where(eq(productsTags.productId, id));

        const [productDeleted] = await trx
          .delete(product)
          .where(eq(product.id, id))
          .returning();

        if (!productDeleted) {
          throw new Error("Product not found or deletion failed.");
        }

        return productDeleted;
      });
    } catch (error) {
      logger.error("Error removing product", error);
      return null;
    }
  }
}
