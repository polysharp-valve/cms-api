import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types.js";
import { OpenAPIHono } from "@hono/zod-openapi";

import * as controllers from "./categories.controllers.js";
import * as routes from "./categories.routes.js";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(routes.findAll, controllers.findAll);
router.openapi(routes.create, controllers.create);
router.openapi(routes.update, controllers.update);
router.openapi(routes.remove, controllers.remove);

export default router;
