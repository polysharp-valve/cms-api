import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { productTagSchema } from "@/database/schemas/product-tag";
import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductTagRoute.create;
export type Find = typeof ProductTagRoute.find;
export type FindOne = typeof ProductTagRoute.findOne;
export type Update = typeof ProductTagRoute.update;
export type Remove = typeof ProductTagRoute.remove;

export default abstract class ProductTagRoute {
  private static tags = ["ProductTag"];

  public static create = createRoute({
    tags: ProductTagRoute.tags,
    path: "/product-tags",
    method: "post",
    request: {
      body: jsonContentRequired(
        productTagSchema.insert,
        "Product tag creation payload",
      ),
    },
    responses: {
      201: jsonContent(productTagSchema.select, "Create product tag"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static find = createRoute({
    tags: ProductTagRoute.tags,
    path: "/product-tags",
    method: "get",
    request: {},
    responses: {
      200: jsonContent(z.array(productTagSchema.select), "Find product tags"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static findOne = createRoute({
    tags: ProductTagRoute.tags,
    path: "/product-tags/{tagId}",
    method: "get",
    request: {
      params: z.object({ tagId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(productTagSchema.select, "Find product tag by id"),
      404: jsonContent(
        { status: 404, message: "Product tags not found" },
        "Product tags not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static update = createRoute({
    tags: ProductTagRoute.tags,
    path: "/product-tags/{tagId}",
    method: "put",
    request: {
      params: z.object({ tagId: z.string().min(12).max(12) }).strict(),
      body: jsonContent(productTagSchema.update, "Product tag update payload"),
    },
    responses: {
      200: jsonContent(productTagSchema.select, "Update product tag"),
      404: jsonContent(
        { status: 404, message: "Product tags not found" },
        "Product tags not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static remove = createRoute({
    tags: ProductTagRoute.tags,
    path: "/product-tags/{tagId}",
    method: "delete",
    request: {
      params: z.object({ tagId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(productTagSchema.select, "Product tag deleted"),
      404: jsonContent(
        { status: 404, message: "Product tags not found" },
        "Product tags not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });
}
