import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductCollectionService from "./service";
import { InternalServerError, NotFound } from "@/helpers/HttpError";

export default abstract class ProductCollectionController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const data = c.req.valid("json");

    const res = await ProductCollectionService.create(data);
    if (!res) {
      throw new InternalServerError("Product Collection not created");
    }

    return c.json(res, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductCollectionService.find();

    return c.json(res, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { collectionId } = c.req.valid("param");

    const res = await ProductCollectionService.findOne(collectionId);
    if (!res) {
      throw new NotFound("Product Collection not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { collectionId } = c.req.valid("param");
    const data = c.req.valid("json");

    const res = await ProductCollectionService.update(collectionId, data);
    if (!res) {
      throw new NotFound("Product Collection not found");
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { collectionId } = c.req.valid("param");

    const res = await ProductCollectionService.remove(collectionId);
    if (!res) {
      throw new NotFound("Product Collection not found");
    }

    return c.json(res, 200);
  };
}
