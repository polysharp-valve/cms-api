import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { product } from "./product";
import { productCategory } from "./product-category";

export const productsCategories = pgTable("products_categories", {
  productCategoryId: varchar().references(() => productCategory.id),
  productId: varchar().references(() => product.id),
});

export const productsCategoriesSchema = {
  insert: createInsertSchema(productsCategories).strict(),
  select: createSelectSchema(productsCategories).strict(),
} as const;

export type ProductsCategories = {
  Insert: z.input<typeof productsCategoriesSchema.insert>;
  Select: z.output<typeof productsCategoriesSchema.select>;
};
