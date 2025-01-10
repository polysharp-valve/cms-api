import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import MediaService from "./service";
import FolderService from "../folder/service";

export default abstract class MediaController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const { file, folderId } = c.req.valid("form");

    // TODO: refactor this to a helper function with fixed types and extensions
    let fileType: "image" | "video" | "file" = "file";
    switch (file.type) {
      case "image/jpeg":
      case "image/png":
      case "image/gif":
      case "image/webp":
        fileType = "image";
        break;
      case "video/mp4":
      case "video/webm":
      case "video/ogg":
        fileType = "video";
        break;
      default:
        fileType = "file";
    }

    if (folderId) {
      const folderExists = await FolderService.findOne(folderId);

      if (!folderExists) {
        return c.json({ message: "Folder not found" }, 404);
      }
    }

    const fileUploaded = await MediaService.uploadMedia(file);
    if (!fileUploaded) {
      return c.json({ message: "File not uploaded" }, 500);
    }

    const mediaCreated = await MediaService.create({
      name: file.name,
      type: fileType,
      src: fileUploaded,
      folderId,
    });
    if (!mediaCreated) {
      return c.json({ message: "Media not created" }, 500);
    }

    return c.json(mediaCreated, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const folderId = c.req.valid("query").folderId;

    const res = await MediaService.find(folderId);
    return c.json(res, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { mediaId } = c.req.valid("param");

    const res = await MediaService.findOne(mediaId);
    if (!res) {
      return c.json({ message: "Media not found" }, 404);
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { mediaId } = c.req.valid("param");
    const data = c.req.valid("json");

    const res = await MediaService.update(mediaId, data);
    if (!res) {
      return c.json({ message: "Media not found" }, 404);
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { mediaId } = c.req.valid("param");

    const res = await MediaService.remove(mediaId);
    if (!res) {
      return c.json({ message: "Media not found" }, 404);
    }

    return c.json(res, 200);
  };
}
