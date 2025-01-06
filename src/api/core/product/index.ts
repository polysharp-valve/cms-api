import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import ProductController from "./controller";
import ProductRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(ProductRoute.create, ProductController.create);
router.openapi(ProductRoute.find, ProductController.find);
router.openapi(ProductRoute.findOne, ProductController.findOne);
router.openapi(ProductRoute.update, ProductController.update);
router.openapi(ProductRoute.remove, ProductController.remove);

export default router;
