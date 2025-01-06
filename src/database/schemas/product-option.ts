import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { product } from "./product";

export const productOption = pgTable("product_option", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  name: varchar().notNull(),
  productId: varchar().references(() => product.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productOptionSchema = {
  insert: createInsertSchema(productOption).strict().omit({ id: true }),
  select: createSelectSchema(productOption).strict(),
  update: createUpdateSchema(productOption).strict().pick({
    name: true,
  }),
} as const;

export type ProductOption = {
  Insert: z.input<typeof productOptionSchema.insert>;
  Select: z.output<typeof productOptionSchema.select>;
  Update: z.input<typeof productOptionSchema.update>;
};
