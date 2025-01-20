import { InternalServerError, NotFound } from "@/helpers/HttpError";
import { AppRouteHandler } from "@/types";

import FolderService from "../folder/service";
import { Create, Find, FindOne, Remove, Update } from "./route";
import MediaService from "./service";

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
        throw new NotFound("Folder not found");
      }
    }

    const fileUploaded = await MediaService.uploadMedia(file);
    if (!fileUploaded) {
      throw new InternalServerError("Media not uploaded");
    }

    const mediaCreated = await MediaService.create({
      name: file.name,
      type: fileType,
      src: fileUploaded,
      folderId,
    });
    if (!mediaCreated) {
      throw new InternalServerError("Media not created");
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
      throw new NotFound("Media not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { mediaId } = c.req.valid("param");
    const data = c.req.valid("json");

    const res = await MediaService.update(mediaId, data);
    if (!res) {
      throw new NotFound("Media not found");
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { mediaId } = c.req.valid("param");

    const res = await MediaService.remove(mediaId);
    if (!res) {
      throw new NotFound("Media not found");
    }

    return c.json(res, 200);
  };
}
