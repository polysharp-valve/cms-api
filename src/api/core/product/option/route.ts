import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductOptionRoute.create;
export type Find = typeof ProductOptionRoute.find;
export type FindOne = typeof ProductOptionRoute.findOne;
export type Update = typeof ProductOptionRoute.update;
export type Remove = typeof ProductOptionRoute.remove;

export default abstract class ProductOptionRoute {
  private static tags = ["ProductOption"];

  public static create = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options",
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
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options",
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
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}",
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
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}",
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
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}",
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
