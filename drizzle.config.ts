import { defineConfig } from "drizzle-kit";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export default defineConfig({
  out: "./drizzle",
  schema: (() => {
    function getSchemaPaths(dir: string): string[] {
      let results: string[] = [];
      const list = readdirSync(dir);

      list.forEach((file) => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat && stat.isDirectory()) {
          results = results.concat(getSchemaPaths(filePath));
        } else if (file.endsWith(".schema.ts")) {
          results.push(filePath);
        }
      });

      return results;
    }

    return getSchemaPaths("./src/api");
  })(),
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: "snake_case",
});
