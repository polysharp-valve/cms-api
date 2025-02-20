import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

import { folder } from "./folder";

export const mediaTypeEnum = pgEnum("media_type", ["image", "video", "file"]);

export const media = pgTable("media", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  folderId: varchar().references(() => folder.id),
  name: varchar().notNull(),
  type: mediaTypeEnum().notNull(),
  src: varchar().notNull(),
  alt: varchar(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const mediaSchema = {
  insert: createInsertSchema(media).strict().omit({ id: true }),
  select: createSelectSchema(media).strict(),
  update: createUpdateSchema(media).strict().pick({
    name: true,
    alt: true,
  }),
} as const;

export type Media = {
  Insert: z.input<typeof mediaSchema.insert>;
  Select: z.output<typeof mediaSchema.select>;
  Update: z.input<typeof mediaSchema.update>;
};
