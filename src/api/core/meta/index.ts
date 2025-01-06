import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import MetaController from "./controller";
import MetaRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(MetaRoute.create, MetaController.create);
router.openapi(MetaRoute.find, MetaController.find);
router.openapi(MetaRoute.findOne, MetaController.findOne);
router.openapi(MetaRoute.update, MetaController.update);
router.openapi(MetaRoute.remove, MetaController.remove);

export default router;
