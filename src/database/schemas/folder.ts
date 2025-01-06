import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { createId } from "@/helpers/custom-cuid2";

export const folder = pgTable("folder", {
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

export const folderSchema = {
  insert: createInsertSchema(folder).strict().omit({ id: true }),
  select: createSelectSchema(folder).strict(),
  update: createUpdateSchema(folder).strict().pick({
    name: true,
  }),
} as const;

export type Folder = {
  Insert: z.input<typeof folderSchema.insert>;
  Select: z.output<typeof folderSchema.select>;
  Update: z.input<typeof folderSchema.update>;
};
