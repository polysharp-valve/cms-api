import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductOptionService from "./service";

export default abstract class ProductOptionController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const res = await ProductOptionService.create();
    return c.json(res, 501);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductOptionService.find();
    console.log("TOTO");
    return c.json(res, 501);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const res = await ProductOptionService.findOne();
    return c.json(res, 501);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const res = await ProductOptionService.update();
    return c.json(res, 501);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const res = await ProductOptionService.remove();
    return c.json(res, 501);
  };
}
