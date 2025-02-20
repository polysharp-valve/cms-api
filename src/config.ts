import { z } from "zod";

import logger from "./helpers/logger";

const configSchema = z.object({
  HOST: z.string().default("0.0.0.0"),
  PORT: z
    .string()
    .regex(/^\d+$/, "PORT must be a number")
    .transform(Number)
    .default("3000"),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  NODE_ENV: z.enum(["development", "production", "test"]),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

const parseConfig = (env = Bun.env): Config => {
  const parsed = configSchema.safeParse(env);

  if (!parsed.success) {
    logger.fatal("Invalid configuration:", parsed.error.format());
    process.exit(1);
  }

  return Object.freeze(parsed.data);
};

export type Config = z.infer<typeof configSchema>;

export default { ...parseConfig() } as const;
