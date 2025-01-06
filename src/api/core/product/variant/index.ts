import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import ProductVariantController from "./controller";
import ProductVariantRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(ProductVariantRoute.create, ProductVariantController.create);
router.openapi(ProductVariantRoute.find, ProductVariantController.find);
router.openapi(ProductVariantRoute.findOne, ProductVariantController.findOne);
router.openapi(ProductVariantRoute.update, ProductVariantController.update);
router.openapi(ProductVariantRoute.remove, ProductVariantController.remove);

export default router;
