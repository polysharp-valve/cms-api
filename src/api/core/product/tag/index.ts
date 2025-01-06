import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import ProductTagController from "./controller";
import ProductTagRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(ProductTagRoute.create, ProductTagController.create);
router.openapi(ProductTagRoute.find, ProductTagController.find);
router.openapi(ProductTagRoute.findOne, ProductTagController.findOne);
router.openapi(ProductTagRoute.update, ProductTagController.update);
router.openapi(ProductTagRoute.remove, ProductTagController.remove);

export default router;
