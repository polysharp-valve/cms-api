import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof MediaRoute.create;
export type Find = typeof MediaRoute.find;
export type FindOne = typeof MediaRoute.findOne;
export type Update = typeof MediaRoute.update;
export type Remove = typeof MediaRoute.remove;

export default abstract class MediaRoute {
  private static tags = ["Media"];

  public static create = createRoute({
    tags: MediaRoute.tags,
    path: "/medias",
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
    tags: MediaRoute.tags,
    path: "/medias",
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
    tags: MediaRoute.tags,
    path: "/medias/{mediaId}",
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
    tags: MediaRoute.tags,
    path: "/medias/{mediaId}",
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
    tags: MediaRoute.tags,
    path: "/medias/{mediaId}",
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
