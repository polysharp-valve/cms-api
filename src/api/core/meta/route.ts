import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof MetaRoute.create;
export type Find = typeof MetaRoute.find;
export type FindOne = typeof MetaRoute.findOne;
export type Update = typeof MetaRoute.update;
export type Remove = typeof MetaRoute.remove;

export default abstract class MetaRoute {
  private static tags = ["Meta"];

  public static create = createRoute({
    tags: MetaRoute.tags,
    path: "/metas",
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
    tags: MetaRoute.tags,
    path: "/metas",
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
    tags: MetaRoute.tags,
    path: "/metas/{metaId}",
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
    tags: MetaRoute.tags,
    path: "/metas/{metaId}",
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
    tags: MetaRoute.tags,
    path: "/metas/{metaId}",
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
