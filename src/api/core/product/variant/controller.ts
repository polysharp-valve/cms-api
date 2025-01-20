import { InternalServerError, NotFound } from "@/helpers/HttpError";
import { AppRouteHandler } from "@/types";

import ProductOptionService from "../option/service";
import ProductService from "../service";
import { Create, Find, FindOne, Remove, Update } from "./route";
import ProductVariantService from "./service";

export default abstract class ProductVariantController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const { productId } = c.req.valid("param");
    const { optionValueIds, ...data } = c.req.valid("json");

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const productOptions = await ProductOptionService.find(productId);

    const optionValuesExist = optionValueIds.every((id: string) =>
      productOptions.some((option) =>
        option.values.some((value) => value.id === id),
      ),
    );
    if (!optionValuesExist) {
      throw new NotFound(
        "One or more option values not found in product options",
      );
    }

    const res = await ProductVariantService.create(
      { ...data, productId },
      optionValueIds,
    );
    if (!res) {
      throw new InternalServerError("Product variant not created");
    }

    return c.json(res, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const { productId } = c.req.valid("param");
    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const res = await ProductVariantService.find(productId);
    return c.json(res, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { productId, variantId } = c.req.valid("param");
    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const res = await ProductVariantService.findOne(productId, variantId);
    if (!res) {
      throw new NotFound("Product variant not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { productId, variantId } = c.req.valid("param");
    const { optionValueIds = [], ...data } = c.req.valid("json");

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const productOptions = await ProductOptionService.find(productId);

    const optionValuesExist = optionValueIds.every((id: string) =>
      productOptions.some((option) =>
        option.values.some((value) => value.id === id),
      ),
    );
    if (!optionValuesExist) {
      throw new NotFound(
        "One or more option values not found in product options",
      );
    }

    const res = await ProductVariantService.update(
      variantId,
      data,
      optionValueIds,
    );
    if (!res) {
      throw new NotFound("Product variant not found");
    }

    return c.json(res, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { productId, variantId } = c.req.valid("param");
    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const res = await ProductVariantService.remove(productId, variantId);
    if (!res) {
      throw new NotFound("Product variant not found");
    }

    return c.json(res, 200);
  };
}
