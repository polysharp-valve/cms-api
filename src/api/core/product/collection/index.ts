import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import ProductCollectionController from "./controller";
import ProductCollectionRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(
  ProductCollectionRoute.create,
  ProductCollectionController.create,
);
router.openapi(ProductCollectionRoute.find, ProductCollectionController.find);
router.openapi(
  ProductCollectionRoute.findOne,
  ProductCollectionController.findOne,
);
router.openapi(
  ProductCollectionRoute.update,
  ProductCollectionController.update,
);
router.openapi(
  ProductCollectionRoute.remove,
  ProductCollectionController.remove,
);

export default router;
