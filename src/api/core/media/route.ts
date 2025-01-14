import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { createRoute, z } from "@hono/zod-openapi";
import { mediaSchema } from "@/database/schemas/media";

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
    request: {
      body: {
        content: {
          "multipart/form-data": {
            schema: z.object({
              file: z.instanceof(File),
              folderId: z.string().min(12).max(12).optional(),
            }),
          },
        },
      },
    },
    responses: {
      201: jsonContent(mediaSchema.select, "Create media"),
      404: jsonContent(
        { status: 404, message: "Folder not found" },
        "Folder not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static find = createRoute({
    tags: MediaRoute.tags,
    path: "/medias",
    method: "get",
    request: {
      query: z.object({
        folderId: z.string().min(12).max(12).optional(),
      }),
    },
    responses: {
      200: jsonContent(mediaSchema.select.array(), "Find medias"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static findOne = createRoute({
    tags: MediaRoute.tags,
    path: "/medias/{mediaId}",
    method: "get",
    request: {
      params: z.object({ mediaId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(mediaSchema.select, "Find media by id"),
      404: jsonContent(
        { status: 404, message: "Media not found" },
        "Media not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static update = createRoute({
    tags: MediaRoute.tags,
    path: "/medias/{mediaId}",
    method: "put",
    request: {
      body: jsonContentRequired(mediaSchema.update, "Media update payload"),
      params: z.object({ mediaId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(mediaSchema.select, "Update media"),
      404: jsonContent(
        { status: 404, message: "Media not found" },
        "Media not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static remove = createRoute({
    tags: MediaRoute.tags,
    path: "/medias/{mediaId}",
    method: "delete",
    request: {
      params: z.object({ mediaId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(mediaSchema.select, "Remove media"),
      404: jsonContent(
        { status: 404, message: "Media not found" },
        "Media not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });
}
