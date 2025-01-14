import { InternalServerError, NotFound } from "@/helpers/HttpError";
import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductCategoryService from "./service";

export default abstract class ProductCategoryController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const data = c.req.valid("json");

    const res = await ProductCategoryService.create(data);
    if (!res) {
      throw new InternalServerError("Product Category not created");
    }

    return c.json(res, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await ProductCategoryService.find();

    return c.json(res, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { categoryId } = c.req.valid("param");

    const res = await ProductCategoryService.findOne(categoryId);
    if (!res) {
      throw new NotFound("Product Category not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { categoryId } = c.req.valid("param");
    const data = c.req.valid("json");

    const res = await ProductCategoryService.update(categoryId, data);
    if (!res) {
      throw new NotFound("Product Category not found");
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { categoryId } = c.req.valid("param");

    const res = await ProductCategoryService.remove(categoryId);
    if (!res) {
      throw new NotFound("Product Category not found");
    }

    return c.json(res, 200);
  };
}
