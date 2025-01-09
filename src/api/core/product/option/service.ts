import { and, eq } from "drizzle-orm";

import db from "@/database/database";
import {
  productOption,
  ProductOption,
} from "@/database/schemas/product-option";
import {
  ProductOptionValue,
  productOptionValue,
} from "@/database/schemas/product-option-value";

export default abstract class ProductOptionService {
  public static async create(productId: string, name: string) {
    const productOptionCreated = await db
      .insert(productOption)
      .values({ productId, name })
      .returning({
        id: productOption.id,
        name: productOption.name,
        productId: productOption.productId,
      });

    if (!productOptionCreated.length) {
      return null;
    }

    return productOptionCreated[0];
  }

  public static async find(productId: string) {
    return db.query.productOption.findMany({
      columns: {
        id: true,
        name: true,
        productId: true,
      },
      where: (productOption, { eq }) => eq(productOption.productId, productId),
      with: {
        values: {
          columns: {
            id: true,
            value: true,
          },
        },
      },
    });
  }

  public static async findOneByName(name: string, productId: string) {
    return db.query.productOption.findFirst({
      columns: {
        id: true,
      },
      where: (productOption, { eq }) =>
        and(
          eq(productOption.name, name),
          eq(productOption.productId, productId),
        ),
    });
  }

  public static async findOne(productId: string, optionId: string) {
    return db.query.productOption.findFirst({
      columns: {
        id: true,
        name: true,
        productId: true,
      },
      where: (productOption, { eq, and }) =>
        and(
          eq(productOption.productId, productId),
          eq(productOption.id, optionId),
        ),
      with: {
        values: {
          columns: {
            id: true,
            value: true,
          },
        },
      },
    });
  }

  public static async update(id: string, data: ProductOption["Update"]) {
    const productOptionUpdated = await db
      .update(productOption)
      .set(data)
      .where(eq(productOption.id, id))
      .returning();

    if (!productOptionUpdated.length) {
      return null;
    }

    return productOptionUpdated[0];
  }

  public static async remove(id: string) {
    const productOptionDeleted = await db
      .delete(productOption)
      .where(eq(productOption.id, id))
      .returning();

    if (!productOptionDeleted.length) {
      return null;
    }

    return productOptionDeleted[0];
  }

  public static async createOptionValue(optionId: string, value: string) {
    const productOptionValueCreated = await db
      .insert(productOptionValue)
      .values({ productOptionId: optionId, value })
      .returning({
        id: productOptionValue.id,
        value: productOptionValue.value,
      });

    if (!productOptionValueCreated.length) {
      return null;
    }

    return productOptionValueCreated[0];
  }

  public static async updateOptionValue(
    optionValueId: string,
    data: ProductOptionValue["Update"],
  ) {
    const productOptionValueUpdated = await db
      .update(productOptionValue)
      .set(data)
      .where(eq(productOptionValue.id, optionValueId))
      .returning();

    if (!productOptionValueUpdated.length) {
      return null;
    }

    return productOptionValueUpdated[0];
  }

  public static async removeOptionValue(id: string) {
    const productOptionValueDeleted = await db
      .delete(productOptionValue)
      .where(eq(productOptionValue.id, id))
      .returning();

    if (!productOptionValueDeleted.length) {
      return null;
    }

    return productOptionValueDeleted[0];
  }

  public static async optionHasValues(optionId: string) {
    return db
      .select({ id: productOptionValue.id })
      .from(productOptionValue)
      .where(eq(productOptionValue.productOptionId, optionId));
  }

  public static async optionValueExists(valueid: string, optionId: string) {
    return db
      .select({ id: productOptionValue.id })
      .from(productOptionValue)
      .where(
        and(
          eq(productOptionValue.id, valueid),
          eq(productOptionValue.productOptionId, optionId),
        ),
      );
  }
}
