import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { productTypeSchema } from "@/database/schemas/product-type";
import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductTypeRoute.create;
export type Find = typeof ProductTypeRoute.find;
export type FindOne = typeof ProductTypeRoute.findOne;
export type Update = typeof ProductTypeRoute.update;
export type Remove = typeof ProductTypeRoute.remove;

export default abstract class ProductTypeRoute {
  private static tags = ["ProductType"];

  public static create = createRoute({
    tags: ProductTypeRoute.tags,
    path: "/product-types",
    method: "post",
    request: {
      body: jsonContentRequired(
        productTypeSchema.insert,
        "Product type creation payload",
      ),
    },
    responses: {
      201: jsonContent(productTypeSchema.select, "Create product type"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static find = createRoute({
    tags: ProductTypeRoute.tags,
    path: "/product-types",
    method: "get",
    request: {},
    responses: {
      200: jsonContent(z.array(productTypeSchema.select), "Find product types"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static findOne = createRoute({
    tags: ProductTypeRoute.tags,
    path: "/product-types/{typeId}",
    method: "get",
    request: {
      params: z.object({ typeId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(productTypeSchema.select, "Find product type by id"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static update = createRoute({
    tags: ProductTypeRoute.tags,
    path: "/product-types/{typeId}",
    method: "put",
    request: {
      params: z.object({ typeId: z.string().min(12).max(12) }).strict(),
      body: jsonContent(
        productTypeSchema.update,
        "Product type update payload",
      ),
    },
    responses: {
      200: jsonContent(productTypeSchema.select, "Update product type by id"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });

  public static remove = createRoute({
    tags: ProductTypeRoute.tags,
    path: "/product-types/{typeId}",
    method: "delete",
    request: {
      params: z.object({ typeId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(productTypeSchema.select, "Delete product type by id"),
      500: jsonContent({ message: "Unexpected error" }, "Unexpected error"),
    },
  });
}
