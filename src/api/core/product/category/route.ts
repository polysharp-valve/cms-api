import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { productCategorySchema } from "@/database/schemas/product-category";
import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductCategoryRoute.create;
export type Find = typeof ProductCategoryRoute.find;
export type FindOne = typeof ProductCategoryRoute.findOne;
export type Update = typeof ProductCategoryRoute.update;
export type Remove = typeof ProductCategoryRoute.remove;

export default abstract class ProductCategoryRoute {
  private static tags = ["ProductCategory"];

  public static create = createRoute({
    tags: ProductCategoryRoute.tags,
    path: "/product-categories",
    method: "post",
    request: {
      body: jsonContentRequired(
        productCategorySchema.insert,
        "Product category creation payload",
      ),
    },
    responses: {
      201: jsonContent(productCategorySchema.select, "Create product category"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static find = createRoute({
    tags: ProductCategoryRoute.tags,
    path: "/product-categories",
    method: "get",
    request: {
      query: z.object({
        parentId: z.string().optional(),
      }),
    },
    responses: {
      200: jsonContent(
        productCategorySchema.select.array(),
        "Find product categories",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static findOne = createRoute({
    tags: ProductCategoryRoute.tags,
    path: "/product-categories/{categoryId}",
    method: "get",
    request: {
      params: z.object({ categoryId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(
        productCategorySchema.select,
        "Find product category by id",
      ),
      404: jsonContent(
        { status: 404, message: "Product category not found" },
        "Product category not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static update = createRoute({
    tags: ProductCategoryRoute.tags,
    path: "/product-categories/{categoryId}",
    method: "put",
    request: {
      params: z.object({ categoryId: z.string().min(12).max(12) }).strict(),
      body: jsonContent(
        productCategorySchema.update,
        "Product category update payload",
      ),
    },
    responses: {
      200: jsonContent(
        productCategorySchema.select,
        "Update product category by id",
      ),
      404: jsonContent(
        { status: 404, message: "Product category not found" },
        "Product category not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static remove = createRoute({
    tags: ProductCategoryRoute.tags,
    path: "/product-categories/{categoryId}",
    method: "delete",
    request: {
      params: z.object({ categoryId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(productCategorySchema.select, "Remove product category"),
      404: jsonContent(
        { status: 404, message: "Product category not found" },
        "Product category not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });
}
