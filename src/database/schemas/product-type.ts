import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

export const productType = pgTable("product_type", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  value: varchar().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productTypeSchema = {
  insert: createInsertSchema(productType).strict().omit({ id: true }),
  select: createSelectSchema(productType).strict(),
  update: createUpdateSchema(productType).strict().pick({
    value: true,
  }),
} as const;

export type ProductType = {
  Insert: z.input<typeof productTypeSchema.insert>;
  Select: z.output<typeof productTypeSchema.select>;
  Update: z.input<typeof productTypeSchema.update>;
};
