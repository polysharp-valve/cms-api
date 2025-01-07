import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { media } from "./media";

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
    metaTitle: varchar(),
    metaDescription: varchar(),
    metaMediaId: varchar().references(() => media.id),
    description: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    slugIdx: index().on(table.slug),
    parentIdIdx: index().on(table.parentId),
  }),
);

export const productCategorySchema = {
  insert: createInsertSchema(productCategory).strict().omit({ id: true }),
  select: createSelectSchema(productCategory).strict(),
  update: createUpdateSchema(productCategory).strict().pick({
    name: true,
    slug: true,
    title: true,
    description: true,
    metaTitle: true,
    metaDescription: true,
    metaMediaId: true,
  }),
} as const;

export type ProductCategory = {
  Insert: z.input<typeof productCategorySchema.insert>;
  Select: z.output<typeof productCategorySchema.select>;
  Update: z.input<typeof productCategorySchema.update>;
};
