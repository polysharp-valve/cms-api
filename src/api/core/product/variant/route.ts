import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductVariantRoute.create;
export type Find = typeof ProductVariantRoute.find;
export type FindOne = typeof ProductVariantRoute.findOne;
export type Update = typeof ProductVariantRoute.update;
export type Remove = typeof ProductVariantRoute.remove;

export default abstract class ProductVariantRoute {
  private static tags = ["ProductVariant"];

  public static create = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants",
    method: "post",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet...",
      ),
    },
  });

  public static find = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants",
    method: "get",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet...",
      ),
    },
  });

  public static findOne = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants/{variantId}",
    method: "get",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet...",
      ),
    },
  });

  public static update = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants/{variantId}",
    method: "put",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet...",
      ),
    },
  });

  public static remove = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants/{variantId}",
    method: "delete",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet...",
      ),
    },
  });
}
