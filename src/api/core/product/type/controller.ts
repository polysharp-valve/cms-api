import { InternalServerError, NotFound } from "@/helpers/HttpError";
import logger from "@/helpers/logger";
import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductTypeService from "./service";

export default abstract class ProductTypeController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const data = c.req.valid("json");
    const res = await ProductTypeService.create(data);

    if (!res) {
      throw new InternalServerError("ProductType not created");
    }

    return c.json(res, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductTypeService.find();

    return c.json(res, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { typeId } = c.req.valid("param");
    const res = await ProductTypeService.findOne(typeId);

    if (!res) {
      throw new NotFound("ProductType not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { typeId } = c.req.valid("param");
    const data = c.req.valid("json");
    const res = await ProductTypeService.update(typeId, data);

    if (!res) {
      throw new NotFound("ProductType not found");
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    try {
      const { typeId } = c.req.valid("param");
      const res = await ProductTypeService.remove(typeId);

      if (!res) {
        throw new NotFound("ProductType not found");
      }

      return c.json(res, 200);
    } catch (error) {
      logger.error("[ProductTypeController.remove] - unexpected error");
      throw error;
    }
  };
}
