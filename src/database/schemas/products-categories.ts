import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { product } from "./product";
import { productCategory } from "./product-category";

export const productsCategories = pgTable(
  "products_categories",
  {
    productCategoryId: varchar()
      .references(() => productCategory.id)
      .notNull(),
    productId: varchar()
      .references(() => product.id)
      .notNull(),
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.productCategoryId, table.productId],
      }),
    },
  ]
);

export const productsCategoriesSchema = {
  insert: createInsertSchema(productsCategories).strict(),
  select: createSelectSchema(productsCategories).strict(),
} as const;

export type ProductsCategories = {
  Insert: z.input<typeof productsCategoriesSchema.insert>;
  Select: z.output<typeof productsCategoriesSchema.select>;
};
