import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { productOption } from "./product-option";

export const productOptionValue = pgTable("product_option_value", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  value: varchar().notNull(),
  productOptionId: varchar()
    .references(() => productOption.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productOptionValueSchema = {
  insert: createInsertSchema(productOptionValue).strict().omit({ id: true }),
  select: createSelectSchema(productOptionValue).strict(),
  update: createUpdateSchema(productOptionValue).strict().pick({
    value: true,
  }),
} as const;

export type ProductOptionValue = {
  Insert: z.input<typeof productOptionValueSchema.insert>;
  Select: z.output<typeof productOptionValueSchema.select>;
  Update: z.input<typeof productOptionValueSchema.update>;
};
