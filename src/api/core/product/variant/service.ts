import { and, eq, inArray } from "drizzle-orm";

import db from "@/database/database";
import {
  productVariant,
  ProductVariant,
} from "@/database/schemas/product-variant";
import { productVariantsOptionValues } from "@/database/schemas/product-variants-option-values";
import logger from "@/helpers/logger";
import slugify from "@/helpers/slugify";

export default abstract class ProductVariantService {
  public static async create(
    data: ProductVariant["Insert"] & { productId: string },
    optionValueIds: string[] = [],
  ): Promise<ProductVariant["Select"] | null> {
    try {
      return await db.transaction(async (trx) => {
        const [createdVariant] = await trx
          .insert(productVariant)
          .values({ ...data, slug: slugify(data.name) })
          .returning();

        if (!createdVariant) {
          throw new Error("Product variant creation failed.");
        }

        if (optionValueIds.length) {
          const values = optionValueIds.map((optionValueId) => ({
            productVariantId: createdVariant.id,
            productOptionValueId: optionValueId,
          }));
          const assignedOptionValues = await trx
            .insert(productVariantsOptionValues)
            .values(values)
            .returning();

          if (assignedOptionValues.length !== optionValueIds.length) {
            throw new Error(
              "Failed to assign all option values to the product variant.",
            );
          }
        }

        return createdVariant;
      });
    } catch (error) {
      logger.error("Error creating product variant", error);
      return null;
    }
  }

  public static async find(productId: string) {
    return db.query.productVariant.findMany({
      where: (productVariant, { eq }) =>
        eq(productVariant.productId, productId),
      with: {
        productOptionValues: {
          columns: {},
          with: {
            productOptionValue: {
              columns: {
                id: true,
                value: true,
              },
            },
          },
        },
      },
    });
  }

  public static async findOne(productId: string, variantId: string) {
    return db.query.productVariant.findFirst({
      where: (productVariant, { eq, and }) =>
        and(
          eq(productVariant.id, variantId),
          eq(productVariant.productId, productId),
        ),
      with: {
        productOptionValues: {
          columns: {},
          with: {
            productOptionValue: {
              columns: {
                id: true,
                value: true,
              },
            },
          },
        },
      },
    });
  }

  public static async update(
    variantId: string,
    data: ProductVariant["Update"],
    optionValueIds: string[],
  ): Promise<ProductVariant["Select"] | null> {
    try {
      let variantUpdated: ProductVariant["Select"] | null = null;

      await db.transaction(async (trx) => {
        const [updatedVariant] = await trx
          .update(productVariant)
          .set(data)
          .where(eq(productVariant.id, variantId))
          .returning();

        if (!updatedVariant) {
          throw new Error("Product variant not found");
        }

        const existingOptionValues = await trx
          .select()
          .from(productVariantsOptionValues)
          .where(
            eq(productVariantsOptionValues.productVariantId, updatedVariant.id),
          );

        const existingOptionValueIds = new Set(
          existingOptionValues.map((ov) => ov.productOptionValueId),
        );

        const optionValuesToRemove = existingOptionValues.filter(
          (ov) => !optionValueIds.includes(ov.productOptionValueId),
        );

        const optionValuesToAdd = optionValueIds.filter(
          (id) => !existingOptionValueIds.has(id),
        );

        if (optionValuesToRemove.length) {
          await trx.delete(productVariantsOptionValues).where(
            inArray(
              productVariantsOptionValues.productOptionValueId,
              optionValuesToRemove.map((ov) => ov.productOptionValueId),
            ),
          );
        }

        if (optionValuesToAdd.length) {
          await trx.insert(productVariantsOptionValues).values(
            optionValuesToAdd.map((optionValueId) => ({
              productVariantId: updatedVariant.id,
              productOptionValueId: optionValueId,
            })),
          );
        }

        variantUpdated = updatedVariant;
      });

      return variantUpdated;
    } catch (error) {
      logger.error("Error updating product variant", error);
      return null;
    }
  }

  public static async remove(
    productId: string,
    variantId: string,
  ): Promise<ProductVariant["Select"] | null> {
    try {
      return await db.transaction(async (trx) => {
        await trx
          .delete(productVariantsOptionValues)
          .where(eq(productVariantsOptionValues.productVariantId, variantId));

        const [variantDeleted] = await trx
          .delete(productVariant)
          .where(
            and(
              eq(productVariant.id, variantId),
              eq(productVariant.productId, productId),
            ),
          )
          .returning();

        if (!variantDeleted) {
          throw new Error("Product variant not found or deletion failed.");
        }

        return variantDeleted;
      });
    } catch (error) {
      logger.error("Error removing product variant", error);
      return null;
    }
  }
}
