import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { meta } from "./meta";
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
  metaId: varchar().references(() => meta.id),
  productTypeId: varchar().references(() => productType.id),
  status: productStatusEnum("draft").notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productSchema = {
  insert: createInsertSchema(product).strict().omit({ id: true }),
  select: createSelectSchema(product).strict(),
  update: createUpdateSchema(product).strict().pick({
    name: true,
    slug: true,
    metaId: true,
    productTypeId: true,
    status: true,
  }),
} as const;

export type Product = {
  Insert: z.input<typeof productSchema.insert>;
  Select: z.output<typeof productSchema.select>;
  Update: z.input<typeof productSchema.update>;
};
