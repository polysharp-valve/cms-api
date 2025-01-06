import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

export const mediaFolder = pgTable("media_folder", {
  id: varchar()
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  name: varchar().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const mediaFolderSchema = {
  insert: createInsertSchema(mediaFolder).strict().omit({ id: true }),
  select: createSelectSchema(mediaFolder).strict(),
  update: createUpdateSchema(mediaFolder).strict().pick({
    name: true,
  }),
} as const;

export type MediaFolder = {
  Insert: z.input<typeof mediaFolderSchema.insert>;
  Select: z.output<typeof mediaFolderSchema.select>;
  Update: z.input<typeof mediaFolderSchema.update>;
};
