import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { product } from "./product";
import { productCollection } from "./product-collection";

export const productsCollections = pgTable(
  "products_collections",
  {
    productCollectionId: varchar()
      .references(() => productCollection.id)
      .notNull(),
    productId: varchar()
      .references(() => product.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.productCollectionId, table.productId],
    }),
  }),
);

export const productsCollectionsSchema = {
  insert: createInsertSchema(productsCollections).strict(),
  select: createSelectSchema(productsCollections).strict(),
} as const;

export type ProductsCategories = {
  Insert: z.input<typeof productsCollectionsSchema.insert>;
  Select: z.output<typeof productsCollectionsSchema.select>;
};
