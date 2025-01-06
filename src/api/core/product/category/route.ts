import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductCategoryRoute.create;
export type Find = typeof ProductCategoryRoute.find;
export type FindOne = typeof ProductCategoryRoute.findOne;
export type Update = typeof ProductCategoryRoute.update;
export type Remove = typeof ProductCategoryRoute.remove;

export default abstract class ProductCategoryRoute {
  private static tags = ["ProductCategory"];

  public static create = createRoute({
    tags: ProductCategoryRoute.tags,
    path: "/product-categories",
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
    tags: ProductCategoryRoute.tags,
    path: "/product-categories",
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
    tags: ProductCategoryRoute.tags,
    path: "/product-categories/{categoryId}",
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
    tags: ProductCategoryRoute.tags,
    path: "/product-categories/{categoryId}",
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
    tags: ProductCategoryRoute.tags,
    path: "/product-categories/{categoryId}",
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
