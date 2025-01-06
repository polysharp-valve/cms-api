import defaultHook from "stoker/openapi/default-hook";

import { OpenAPIHono } from "@hono/zod-openapi";

import folderRouter from "./api/core/folder";
import mediaRouter from "./api/core/media";
import metaRouter from "./api/core/meta";
import productRouter from "./api/core/product";
import productCategoryRouter from "./api/core/product/category";
import productCollectionRouter from "./api/core/product/collection";
import productOptionRouter from "./api/core/product/option";
import productTagRouter from "./api/core/product/tag";
import productTypeRouter from "./api/core/product/type";
import productVariantRouter from "./api/core/product/variant";

import type { AppBindings } from "./types.js";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.route("/", folderRouter);
router.route("/", mediaRouter);
router.route("/", metaRouter);
router.route("/", productCategoryRouter);
router.route("/", productCollectionRouter);
router.route("/", productOptionRouter);
router.route("/", productTagRouter);
router.route("/", productTypeRouter);
router.route("/", productVariantRouter);
router.route("/", productRouter);

export default router;
