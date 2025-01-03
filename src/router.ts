import defaultHook from "stoker/openapi/default-hook";

import { OpenAPIHono } from "@hono/zod-openapi";

import categoriesRoutes from "./api/categories/categories.index";

import type { AppBindings } from "./types.js";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.route("/", categoriesRoutes);

export default router;
