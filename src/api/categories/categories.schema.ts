import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

export const categories = pgTable(
  "categories",
  {
    id: varchar()
      .$defaultFn(() => createId())
      .primaryKey()
      .unique(),
    parentId: varchar(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    title: varchar(),
    description: text(),
    metaTitle: varchar(),
    metaDescription: varchar(),
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

export const categoriesSchema = {
  insert: createInsertSchema(categories).strict().omit({ id: true }),
  select: createSelectSchema(categories).strict(),
  update: createUpdateSchema(categories).strict().pick({
    title: true,
    description: true,
    metaTitle: true,
    metaDescription: true,
  }),
} as const;

export type Categories = {
  Insert: z.input<typeof categoriesSchema.insert>;
  Select: z.output<typeof categoriesSchema.select>;
  Update: z.input<typeof categoriesSchema.update>;
};
