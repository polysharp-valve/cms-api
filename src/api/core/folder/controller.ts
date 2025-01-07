import { InternalServerError, NotFound } from "@/helpers/HttpError";
import logger from "@/helpers/logger";
import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import FolderService from "./service";

export default abstract class FolderController {
  public static create: AppRouteHandler<Create> = async (c) => {
    try {
      const data = c.req.valid("json");
      const res = await FolderService.create(data);

      if (!res) {
        throw new InternalServerError("Folder not created");
      }

      return c.json(res, 201);
    } catch (error) {
      logger.error("[FolderController.create] - unexpected error");
      throw error;
    }
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    try {
      const res = await FolderService.find();

      return c.json(res, 200);
    } catch (error) {
      logger.error("[FolderController.find] - unexpected error");
      throw error;
    }
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    try {
      const { folderId } = c.req.valid("param");
      const res = await FolderService.findOne(folderId);

      if (!res) {
        throw new NotFound("Folder not found");
      }

      return c.json(res, 200);
    } catch (error) {
      logger.error("[FolderController.findOne] - unexpected error");
      throw error;
    }
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    try {
      const { folderId } = c.req.valid("param");
      const data = c.req.valid("json");
      const res = await FolderService.update(folderId, data);

      if (!res) {
        throw new NotFound("Folder not found");
      }

      return c.json(res, 200);
    } catch (error) {
      logger.error("[FolderController.update] - unexpected error");
      throw error;
    }
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    try {
      const { folderId } = c.req.valid("param");
      const res = await FolderService.remove(folderId);

      if (!res) {
        throw new NotFound("Folder not found");
      }

      return c.json(res, 200);
    } catch (error) {
      logger.error("[FolderController.remove] - unexpected error");
      throw error;
    }
  };
}
