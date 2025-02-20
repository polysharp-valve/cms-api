import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { product } from "./product";

export const productVariant = pgTable("product_variant", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  name: varchar().notNull(),
  slug: varchar().notNull(),
  sku: varchar(),
  barcode: varchar(),
  productId: varchar()
    .references(() => product.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productVariantSchema = {
  insert: createInsertSchema(productVariant).strict().omit({ id: true }),
  select: createSelectSchema(productVariant).strict(),
  update: createUpdateSchema(productVariant).strict().pick({
    name: true,
    slug: true,
    sku: true,
    barcode: true,
  }),
} as const;

export type ProductVariant = {
  Insert: z.input<typeof productVariantSchema.insert>;
  Select: z.output<typeof productVariantSchema.select>;
  Update: z.input<typeof productVariantSchema.update>;
};
