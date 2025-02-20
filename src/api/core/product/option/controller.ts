import { Conflict, InternalServerError, NotFound } from "@/helpers/HttpError";
import { AppRouteHandler } from "@/types";

import ProductService from "../service";
import {
  Create,
  CreateValues,
  Find,
  FindOne,
  Remove,
  RemoveValue,
  Update,
  UpdateValue,
} from "./route";
import ProductOptionService from "./service";

export default abstract class ProductOptionController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const { productId } = c.req.valid("param");
    const data = c.req.valid("json");

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const productOptionExists = await ProductOptionService.findOneByName(
      data.name,
      productId,
    );
    if (productOptionExists) {
      throw new Conflict("ProductOption already exists");
    }

    const optionCreated = await ProductOptionService.create(
      productId,
      data.name,
    );
    if (!optionCreated) {
      throw new InternalServerError("ProductOption not created");
    }

    const optionValuesCreated = await Promise.all(
      data.values.map(async (value) => {
        const optionValueCreated = await ProductOptionService.createOptionValue(
          optionCreated.id,
          value,
        );

        if (!optionValueCreated) {
          throw new InternalServerError("ProductOptionValue not created");
        }

        return optionValueCreated;
      }),
    );

    return c.json(
      {
        ...optionCreated,
        values: optionValuesCreated,
      },
      201,
    );
  };

  public static createValues: AppRouteHandler<CreateValues> = async (c) => {
    const { productId, optionId } = c.req.valid("param");
    const data = c.req.valid("json");

    const uniqueValues = Array.from(new Set(data));

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const optionExists = await ProductOptionService.findOne(
      productId,
      optionId,
    );
    if (!optionExists) {
      throw new NotFound("ProductOption not found");
    }

    const optionValueCreated = await Promise.allSettled(
      uniqueValues.map((value) => {
        return ProductOptionService.createOptionValue(optionId, value);
      }),
    );

    const optionValues = optionValueCreated
      .filter((res) => res.status === "fulfilled")
      .map((res) => res.value)
      .filter((v) => v !== null);

    return c.json(optionValues, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const { productId } = c.req.valid("param");
    const optionsWithValues = await ProductOptionService.find(productId);

    return c.json(optionsWithValues, 200);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const { productId, optionId } = c.req.valid("param");

    const res = await ProductOptionService.findOne(productId, optionId);

    if (!res) {
      throw new NotFound("ProductOption not found");
    }

    return c.json(res, 200);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const { productId, optionId } = c.req.valid("param");
    const data = c.req.valid("json");

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const optionUpdated = await ProductOptionService.update(optionId, data);
    if (!optionUpdated) {
      throw new NotFound("ProductOption not found");
    }

    const productOptionsWithValues = await ProductOptionService.findOne(
      productId,
      optionUpdated.id,
    );

    return c.json(productOptionsWithValues, 200);
  };

  public static updateValue: AppRouteHandler<UpdateValue> = async (c) => {
    const { productId, optionId, valueId } = c.req.valid("param");
    const data = c.req.valid("json");

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const optionExists = await ProductOptionService.findOne(
      productId,
      optionId,
    );
    if (!optionExists) {
      throw new NotFound("ProductOption not found");
    }

    const optionValueUpdated = await ProductOptionService.updateOptionValue(
      valueId,
      data,
    );
    if (!optionValueUpdated) {
      throw new NotFound("ProductOptionValue not found");
    }

    return c.json(optionValueUpdated, 200);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const { productId, optionId } = c.req.valid("param");

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const optionHasValues =
      await ProductOptionService.optionHasValues(optionId);

    if (optionHasValues && optionHasValues.length) {
      throw new Conflict("ProductOption has values");
    }

    const res = await ProductOptionService.remove(optionId);

    if (!res) {
      throw new NotFound("ProductOption not found");
    }

    return c.json(res, 200);
  };

  public static removeValue: AppRouteHandler<RemoveValue> = async (c) => {
    const { productId, optionId, valueId } = c.req.valid("param");

    const productExists = await ProductService.findOne(productId);
    if (!productExists) {
      throw new NotFound("Product not found");
    }

    const optionExists = await ProductOptionService.findOne(
      productId,
      optionId,
    );
    if (!optionExists) {
      throw new NotFound("ProductOption not found");
    }

    // TODD: Check if value is references product variant before delete. If yes, return 409

    const res = await ProductOptionService.removeOptionValue(valueId);

    if (!res) {
      throw new NotFound("ProductOption not found");
    }

    return c.json(res, 200);
  };
}
