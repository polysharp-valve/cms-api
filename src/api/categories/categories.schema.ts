import { createId } from "@/helpers/custom-cuid2";
import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable(
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
