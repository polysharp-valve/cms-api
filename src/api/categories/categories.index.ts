import defaultHook from "stoker/openapi/default-hook";
import { OpenAPIHono } from "@hono/zod-openapi";

import * as routes from "./categories.routes.js";
import * as controllers from "./categories.controllers.js";
import type { AppBindings } from "../../types.js";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(routes.findAll, controllers.findAll);
router.openapi(routes.create, controllers.create);

export default router;
