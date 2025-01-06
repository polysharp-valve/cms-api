import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductCollectionRoute.create;
export type Find = typeof ProductCollectionRoute.find;
export type FindOne = typeof ProductCollectionRoute.findOne;
export type Update = typeof ProductCollectionRoute.update;
export type Remove = typeof ProductCollectionRoute.remove;

export default abstract class ProductCollectionRoute {
  private static tags = ["ProductCollection"];

  public static create = createRoute({
    tags: ProductCollectionRoute.tags,
    path: "/product-collections",
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
    tags: ProductCollectionRoute.tags,
    path: "/product-collections",
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
    tags: ProductCollectionRoute.tags,
    path: "/product-collections/{collectionId}",
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
    tags: ProductCollectionRoute.tags,
    path: "/product-collections/{collectionId}",
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
    tags: ProductCollectionRoute.tags,
    path: "/product-collections/{collectionId}",
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
