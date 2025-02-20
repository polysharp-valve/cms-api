import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { productCollectionSchema } from "@/database/schemas/product-collection";
import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductCollectionRoute.create;
export type Find = typeof ProductCollectionRoute.find;
export type FindOne = typeof ProductCollectionRoute.findOne;
export type Update = typeof ProductCollectionRoute.update;
export type Remove = typeof ProductCollectionRoute.remove;

export default abstract class ProductCollectionRoute {
  private static tags = ["ProductCollection"];

  public static create = createRoute({
    tags: ProductCollectionRoute.tags,
    path: "/product-collections",
    method: "post",
    request: {
      body: jsonContentRequired(
        productCollectionSchema.insert,
        "Product collection creation payload",
      ),
    },
    responses: {
      201: jsonContent(
        productCollectionSchema.select,
        "Create product collection",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static find = createRoute({
    tags: ProductCollectionRoute.tags,
    path: "/product-collections",
    method: "get",
    request: {},
    responses: {
      200: jsonContent(
        productCollectionSchema.select.array(),
        "Find product collections",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static findOne = createRoute({
    tags: ProductCollectionRoute.tags,
    path: "/product-collections/{collectionId}",
    method: "get",
    request: {
      params: z.object({ collectionId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(
        productCollectionSchema.select,
        "Find product collection",
      ),
      404: jsonContent(
        { status: 404, message: "Product collection not found" },
        "Product collection not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static update = createRoute({
    tags: ProductCollectionRoute.tags,
    path: "/product-collections/{collectionId}",
    method: "put",
    request: {
      params: z.object({ collectionId: z.string().min(12).max(12) }).strict(),
      body: jsonContentRequired(
        productCollectionSchema.update,
        "Product collection update payload",
      ),
    },
    responses: {
      200: jsonContent(
        productCollectionSchema.select,
        "Update product collection by id",
      ),
      404: jsonContent(
        { status: 404, message: "Product collection not found" },
        "Product collection not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static remove = createRoute({
    tags: ProductCollectionRoute.tags,
    path: "/product-collections/{collectionId}",
    method: "delete",
    request: {
      params: z.object({ collectionId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(
        productCollectionSchema.select,
        "Remove product collection by id",
      ),
      404: jsonContent(
        { status: 404, message: "Product collection not found" },
        "Product collection not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });
}
