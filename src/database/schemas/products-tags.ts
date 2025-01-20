import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { product } from "./product";
import { productTag } from "./product-tag";

export const productsTags = pgTable(
  "products_tags",
  {
    productTagId: varchar()
      .references(() => productTag.id)
      .notNull(),
    productId: varchar()
      .references(() => product.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.productTagId, table.productId],
    }),
  }),
);

export const productsTagsSchema = {
  insert: createInsertSchema(productsTags).strict(),
  select: createSelectSchema(productsTags).strict(),
} as const;

export type ProductsTags = {
  Insert: z.input<typeof productsTagsSchema.insert>;
  Select: z.output<typeof productsTagsSchema.select>;
};
