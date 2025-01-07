import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductTypeRoute.create;
export type Find = typeof ProductTypeRoute.find;
export type FindOne = typeof ProductTypeRoute.findOne;
export type Update = typeof ProductTypeRoute.update;
export type Remove = typeof ProductTypeRoute.remove;

export default abstract class ProductTypeRoute {
  private static tags = ["ProductType"];

  public static create = createRoute({
    tags: ProductTypeRoute.tags,
    path: "/product-types",
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
    tags: ProductTypeRoute.tags,
    path: "/product-types",
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
    tags: ProductTypeRoute.tags,
    path: "/product-types/{typeId}",
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
    tags: ProductTypeRoute.tags,
    path: "/product-types/{typeId}",
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
    tags: ProductTypeRoute.tags,
    path: "/product-types/{typeId}",
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
