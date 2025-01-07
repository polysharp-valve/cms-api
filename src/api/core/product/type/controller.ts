import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductTypeService from "./service";

export default abstract class ProductTypeController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const res = await ProductTypeService.create();
    return c.json(res, 501);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductTypeService.find();
    return c.json(res, 501);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const res = await ProductTypeService.findOne();
    return c.json(res, 501);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const res = await ProductTypeService.update();
    return c.json(res, 501);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const res = await ProductTypeService.remove();
    return c.json(res, 501);
  };
}
