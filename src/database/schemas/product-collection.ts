import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { meta } from "./meta";

export const productCollection = pgTable("product_collection", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
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
});

export const productCollectionSchema = {
  insert: createInsertSchema(productCollection).strict().omit({ id: true }),
  select: createSelectSchema(productCollection).strict(),
  update: createUpdateSchema(productCollection).strict().pick({
    name: true,
    slug: true,
    title: true,
    description: true,
    metaId: true,
  }),
} as const;

export type ProductCollection = {
  Insert: z.input<typeof productCollectionSchema.insert>;
  Select: z.output<typeof productCollectionSchema.select>;
  Update: z.input<typeof productCollectionSchema.update>;
};
