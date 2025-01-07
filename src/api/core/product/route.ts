import { jsonContent } from "stoker/openapi/helpers";

import { productSchema } from "@/database/schemas/product";
import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductRoute.create;
export type Find = typeof ProductRoute.find;
export type FindOne = typeof ProductRoute.findOne;
export type Update = typeof ProductRoute.update;
export type Remove = typeof ProductRoute.remove;

export default abstract class ProductRoute {
  private static tags = ["Product"];

  public static create = createRoute({
    tags: ProductRoute.tags,
    path: "/products",
    method: "post",
    request: {
      body: jsonContent(productSchema.insert, "Product creation payload"),
    },
    responses: {
      201: jsonContent(productSchema.select, "Create product"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static find = createRoute({
    tags: ProductRoute.tags,
    path: "/products",
    method: "get",
    request: {},
    responses: {
      200: jsonContent(z.array(productSchema.select), "Find products"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static findOne = createRoute({
    tags: ProductRoute.tags,
    path: "/products/{productId}",
    method: "get",
    request: {
      params: z.object({ productId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(productSchema.select, "Find product by id"),
      404: jsonContent(
        { status: 404, message: "Product not found" },
        "Product not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static update = createRoute({
    tags: ProductRoute.tags,
    path: "/products/{productId}",
    method: "put",
    request: {
      params: z.object({ productId: z.string().min(12).max(12) }).strict(),
      body: jsonContent(productSchema.update, "Product update payload"),
    },
    responses: {
      200: jsonContent(productSchema.select, "Update product"),
      404: jsonContent(
        { status: 404, message: "Product not found" },
        "Product not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static remove = createRoute({
    tags: ProductRoute.tags,
    path: "/products/{productId}",
    method: "delete",
    request: {
      params: z.object({ productId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(productSchema.select, "No Content"),
      404: jsonContent(
        { status: 404, message: "Product not found" },
        "Product not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });
}
