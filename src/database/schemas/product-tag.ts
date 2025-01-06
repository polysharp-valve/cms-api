import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

export const productTag = pgTable("product_tag", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  value: varchar().notNull(),
  displayValue: varchar().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productTagSchema = {
  insert: createInsertSchema(productTag).strict().omit({ id: true }),
  select: createSelectSchema(productTag).strict(),
  update: createUpdateSchema(productTag).strict().pick({
    value: true,
    displayValue: true,
  }),
} as const;

export type ProductTag = {
  Insert: z.input<typeof productTagSchema.insert>;
  Select: z.output<typeof productTagSchema.select>;
  Update: z.input<typeof productTagSchema.update>;
};
