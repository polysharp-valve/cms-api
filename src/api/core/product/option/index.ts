import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import ProductOptionController from "./controller";
import ProductOptionRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(ProductOptionRoute.create, ProductOptionController.create);
router.openapi(
  ProductOptionRoute.createValues,
  ProductOptionController.createValues,
);
router.openapi(ProductOptionRoute.find, ProductOptionController.find);
router.openapi(ProductOptionRoute.findOne, ProductOptionController.findOne);
router.openapi(ProductOptionRoute.update, ProductOptionController.update);
router.openapi(
  ProductOptionRoute.updateValue,
  ProductOptionController.updateValue,
);
router.openapi(ProductOptionRoute.remove, ProductOptionController.remove);
router.openapi(
  ProductOptionRoute.removeValue,
  ProductOptionController.removeValue,
);

export default router;
