import { AppRouteHandler } from "@/types";
import { Create, Find, FindOne, Update, Remove } from "./route";
import FolderService from "./service";

export default abstract class FolderController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const folderCreated = await FolderService.create();
    return c.json(folderCreated, 501);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const folders = await FolderService.find();
    return c.json(folders, 501);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const folder = await FolderService.findOne();
    return c.json(folder, 501);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const folderUpdated = await FolderService.update();
    return c.json(folderUpdated, 501);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const folderDeleted = await FolderService.remove();
    return c.json(folderDeleted, 501);
  };
}
