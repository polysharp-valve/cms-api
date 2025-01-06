import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import ProductTypeController from "./controller";
import ProductTypeRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(ProductTypeRoute.create, ProductTypeController.create);
router.openapi(ProductTypeRoute.find, ProductTypeController.find);
router.openapi(ProductTypeRoute.findOne, ProductTypeController.findOne);
router.openapi(ProductTypeRoute.update, ProductTypeController.update);
router.openapi(ProductTypeRoute.remove, ProductTypeController.remove);

export default router;
