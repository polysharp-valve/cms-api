import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { media } from "./media";

export const meta = pgTable("meta", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  mediaId: varchar().references(() => media.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const metaSchema = {
  insert: createInsertSchema(meta).strict().omit({ id: true }),
  select: createSelectSchema(meta).strict(),
  update: createUpdateSchema(meta).strict().pick({
    title: true,
    description: true,
    mediaId: true,
  }),
} as const;

export type Meta = {
  Insert: z.input<typeof metaSchema.insert>;
  Select: z.output<typeof metaSchema.select>;
  Update: z.input<typeof metaSchema.update>;
};
