import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import ProductCategoryController from "./controller";
import ProductCategoryRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(ProductCategoryRoute.create, ProductCategoryController.create);
router.openapi(ProductCategoryRoute.find, ProductCategoryController.find);
router.openapi(ProductCategoryRoute.findOne, ProductCategoryController.findOne);
router.openapi(ProductCategoryRoute.update, ProductCategoryController.update);
router.openapi(ProductCategoryRoute.remove, ProductCategoryController.remove);

export default router;
