import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { folderSchema } from "@/database/schemas/folder";
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
    request: {
      body: jsonContentRequired(
        z.object({ name: z.string().min(1) }).strict(),
        "Folder creation payload",
      ),
    },
    responses: {
      201: jsonContent(folderSchema.select, "Create folder"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static find = createRoute({
    tags: FolderRoute.tags,
    path: "/folders",
    method: "get",
    request: {},
    responses: {
      200: jsonContent(z.array(folderSchema.select), "Find folders"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static findOne = createRoute({
    tags: FolderRoute.tags,
    path: "/folders/{folderId}",
    method: "get",
    request: {
      params: z.object({ folderId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(folderSchema.select, "Find folder by id"),
      404: jsonContent({ message: "Folder not found" }, "Folder not found"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static update = createRoute({
    tags: FolderRoute.tags,
    path: "/folders/{folderId}",
    method: "put",
    request: {
      params: z.object({ folderId: z.string().min(12).max(12) }).strict(),
      body: jsonContent(
        z.object({ name: z.string().min(1) }).strict(),
        "Folder creation payload",
      ),
    },
    responses: {
      200: jsonContent(folderSchema.select, "Update folder by id"),
      404: jsonContent({ message: "Folder not found" }, "Folder not found"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static remove = createRoute({
    tags: FolderRoute.tags,
    path: "/folders/{folderId}",
    method: "delete",
    request: {
      params: z.object({ folderId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(folderSchema.select, "Delete folder by id"),
      404: jsonContent({ message: "Folder not found" }, "Folder not found"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });
}
