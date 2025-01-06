import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductTagService from "./service";

export default abstract class ProductTagController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const res = await ProductTagService.create();
    return c.json(res, 501);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductTagService.find();
    return c.json(res, 501);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const res = await ProductTagService.findOne();
    return c.json(res, 501);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const res = await ProductTagService.update();
    return c.json(res, 501);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const res = await ProductTagService.remove();
    return c.json(res, 501);
  };
}
