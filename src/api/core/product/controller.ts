import { InternalServerError, NotFound } from "@/helpers/HttpError";
import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductService from "./service";

export default abstract class ProductController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const data = c.req.valid("json");

    const res = await ProductService.create(data);

    if (!res) {
      throw new InternalServerError("Product not created");
    }

    return c.json(res, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductService.find();

    return c.json(res, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { productId } = c.req.valid("param");
    const res = await ProductService.findOne(productId);

    if (!res) {
      throw new NotFound("Product not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { productId } = c.req.valid("param");
    const data = c.req.valid("json");
    const res = await ProductService.update(productId, data);

    if (!res) {
      throw new NotFound("Product not found");
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { productId } = c.req.valid("param");
    const res = await ProductService.remove(productId);

    if (!res) {
      throw new NotFound("Product not found");
    }

    return c.json(res, 200);
  };
}
