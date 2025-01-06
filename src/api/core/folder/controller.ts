import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import FolderService from "./service";

export default abstract class FolderController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const res = await FolderService.create();
    return c.json(res, 501);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await FolderService.find();
    return c.json(res, 501);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const res = await FolderService.findOne();
    return c.json(res, 501);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const res = await FolderService.update();
    return c.json(res, 501);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const res = await FolderService.remove();
    return c.json(res, 501);
  };
}
