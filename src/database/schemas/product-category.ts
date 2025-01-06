import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { meta } from "./meta";

export const productCategory = pgTable(
  "product_category",
  {
    id: varchar()
      .$defaultFn(() => createId())
      .primaryKey()
      .unique(),
    parentId: varchar(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    title: varchar().notNull(),
    description: text(),
    metaId: varchar().references(() => meta.id),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    slugIdx: index().on(table.slug),
    parentIdIdx: index().on(table.parentId),
  })
);

export const productCategorySchema = {
  insert: createInsertSchema(productCategory).strict().omit({ id: true }),
  select: createSelectSchema(productCategory).strict(),
  update: createUpdateSchema(productCategory).strict().pick({
    name: true,
    slug: true,
    title: true,
    description: true,
    metaId: true,
  }),
} as const;

export type ProductCategory = {
  Insert: z.input<typeof productCategorySchema.insert>;
  Select: z.output<typeof productCategorySchema.select>;
  Update: z.input<typeof productCategorySchema.update>;
};
