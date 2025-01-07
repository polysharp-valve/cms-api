import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductTagService from "./service";
import { InternalServerError, NotFound } from "@/helpers/HttpError";

export default abstract class ProductTagController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const data = c.req.valid("json");
    const res = await ProductTagService.create(data);

    if (!res) {
      throw new InternalServerError("ProductTag not created");
    }

    return c.json(res, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductTagService.find();

    return c.json(res, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { tagId } = c.req.valid("param");
    const res = await ProductTagService.findOne(tagId);

    if (!res) {
      throw new NotFound("ProductTag not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { tagId } = c.req.valid("param");
    const data = c.req.valid("json");
    const res = await ProductTagService.update(tagId, data);

    if (!res) {
      throw new NotFound("ProductTag not found");
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { tagId } = c.req.valid("param");
    const res = await ProductTagService.remove(tagId);

    if (!res) {
      throw new NotFound("ProductTag not found");
    }

    return c.json(res, 200);
  };
}
