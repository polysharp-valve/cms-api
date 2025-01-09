import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { media } from "./media";
import { productType } from "./product-type";

export const productStatusEnum = pgEnum("status", [
  "draft",
  "published",
  "archived",
]);

export const product = pgTable("product", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  name: varchar().notNull(),
  slug: varchar().notNull(),
  metaTitle: varchar(),
  metaDescription: varchar(),
  metaMediaId: varchar().references(() => media.id),
  productTypeId: varchar().references(() => productType.id),
  status: productStatusEnum("draft").default("draft").notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productSchema = {
  insert: createInsertSchema(product).strict().omit({
    id: true,
    status: true,
  }),
  select: createSelectSchema(product).strict(),
  update: createUpdateSchema(product).strict().pick({
    name: true,
    slug: true,
    productTypeId: true,
    metaTitle: true,
    metaDescription: true,
    metaMediaId: true,
  }),
} as const;

export type Product = {
  Insert: z.input<typeof productSchema.insert>;
  Select: z.output<typeof productSchema.select>;
  Update: z.input<typeof productSchema.update>;
};
