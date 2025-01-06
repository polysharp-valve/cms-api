import { jsonContent } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof FolderRoute.create;
export type Find = typeof FolderRoute.find;
export type FindOne = typeof FolderRoute.findOne;
export type Update = typeof FolderRoute.update;
export type Remove = typeof FolderRoute.remove;

export default abstract class FolderRoute {
  private static tags = ["Folder"];

  public static create = createRoute({
    tags: FolderRoute.tags,
    path: "/folders",
    method: "post",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet..."
      ),
    },
  });

  public static find = createRoute({
    tags: FolderRoute.tags,
    path: "/folders",
    method: "get",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet..."
      ),
    },
  });

  public static findOne = createRoute({
    tags: FolderRoute.tags,
    path: "/folders/{id}",
    method: "get",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet..."
      ),
    },
  });

  public static update = createRoute({
    tags: FolderRoute.tags,
    path: "/folders/{id}",
    method: "put",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet..."
      ),
    },
  });

  public static remove = createRoute({
    tags: FolderRoute.tags,
    path: "/folders/{id}",
    method: "delete",
    request: {},
    responses: {
      501: jsonContent(
        z.object({ message: z.string() }),
        "Not Implemented... Yet..."
      ),
    },
  });
}
