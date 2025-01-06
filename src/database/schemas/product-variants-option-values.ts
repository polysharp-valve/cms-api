import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { productOptionValue } from "./product-option-value";
import { productVariant } from "./product-variant";

export const productVariantsOptionValues = pgTable(
  "product_variants_option_values",
  {
    productVariantId: varchar().references(() => productVariant.id),
    productOptionValueId: varchar().references(() => productOptionValue.id),
  }
);

export const productVariantsOptionValuesSchema = {
  insert: createInsertSchema(productVariantsOptionValues).strict(),
  select: createSelectSchema(productVariantsOptionValues).strict(),
} as const;

export type ProductVariantsOptionValues = {
  Insert: z.input<typeof productVariantsOptionValuesSchema.insert>;
  Select: z.output<typeof productVariantsOptionValuesSchema.select>;
};
