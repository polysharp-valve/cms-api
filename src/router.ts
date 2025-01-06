import defaultHook from "stoker/openapi/default-hook";

import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "./types.js";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

export default router;
