import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductTagRoute.create;
export type Find = typeof ProductTagRoute.find;
export type FindOne = typeof ProductTagRoute.findOne;
export type Update = typeof ProductTagRoute.update;
export type Remove = typeof ProductTagRoute.remove;

export default abstract class ProductTagRoute {
  private static tags = ["ProductTag"];

  public static create = createRoute({
    tags: ProductTagRoute.tags,
    path: "/product-tags",
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
    tags: ProductTagRoute.tags,
    path: "/product-tags",
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
    tags: ProductTagRoute.tags,
    path: "/product-tags/{tagId}",
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
    tags: ProductTagRoute.tags,
    path: "/product-tags/{tagId}",
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
    tags: ProductTagRoute.tags,
    path: "/product-tags/{tagId}",
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
