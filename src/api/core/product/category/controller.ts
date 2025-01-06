import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductCategoryService from "./service";

export default abstract class ProductCategoryController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const res = await ProductCategoryService.create();
    return c.json(res, 501);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductCategoryService.find();
    return c.json(res, 501);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const res = await ProductCategoryService.findOne();
    return c.json(res, 501);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const res = await ProductCategoryService.update();
    return c.json(res, 501);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const res = await ProductCategoryService.remove();
    return c.json(res, 501);
  };
}
