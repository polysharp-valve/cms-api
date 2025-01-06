import defaultHook from "stoker/openapi/default-hook";

import { OpenAPIHono } from "@hono/zod-openapi";

import folder from "./api/core/folder/index.js";

import type { AppBindings } from "./types.js";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.route("/", folder);

export default router;
