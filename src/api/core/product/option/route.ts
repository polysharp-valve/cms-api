import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { productOptionSchema } from "@/database/schemas/product-option";
import { createRoute, z } from "@hono/zod-openapi";
import { productOptionValueSchema } from "@/database/schemas/product-option-value";

export type Create = typeof ProductOptionRoute.create;
export type CreateValues = typeof ProductOptionRoute.createValues;
export type Find = typeof ProductOptionRoute.find;
export type FindOne = typeof ProductOptionRoute.findOne;
export type Update = typeof ProductOptionRoute.update;
export type UpdateValue = typeof ProductOptionRoute.updateValue;
export type Remove = typeof ProductOptionRoute.remove;
export type RemoveValue = typeof ProductOptionRoute.removeValue;

export default abstract class ProductOptionRoute {
  private static tags = ["ProductOption"];

  public static create = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options",
    method: "post",
    request: {
      params: z.object({ productId: z.string().min(12).max(12) }).strict(),
      body: jsonContentRequired(
        z
          .object({
            name: z.string().min(1),
            values: z.array(z.string().min(1)),
          })
          .strict(),
        "Product option creation payload",
      ),
    },
    responses: {
      201: jsonContent(
        z
          .object({
            id: z.string(),
            name: z.string().min(1),
            productId: z.string().min(12).max(12),
            values: z.array(
              z.object({ id: z.string(), value: z.string().min(1) }),
            ),
          })
          .strict(),
        "Create product option",
      ),
      409: jsonContent(
        { status: 409, message: "Conflict" },
        "ProductOption already exists",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static createValues = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}/values",
    method: "post",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          optionId: z.string().min(12).max(12),
        })
        .strict(),
      body: jsonContentRequired(
        z.array(z.string().min(1)),
        "Product option values creation payload",
      ),
    },
    responses: {
      201: jsonContent(
        z.array(z.object({ id: z.string(), value: z.string().min(1) })),
        "Create product option values",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static find = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options",
    method: "get",
    request: {
      params: z.object({ productId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(
        z.array(
          z.object({
            id: z.string(),
            name: z.string().min(1),
            productId: z.string().min(12).max(12),
            values: z.array(
              z.object({ id: z.string(), value: z.string().min(1) }),
            ),
          }),
        ),
        "Find product options with values",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static findOne = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}",
    method: "get",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          optionId: z.string().min(12).max(12),
        })
        .strict(),
    },
    responses: {
      200: jsonContent(
        z.object({
          id: z.string(),
          name: z.string().min(1),
          productId: z.string().min(12).max(12),
          values: z.array(
            z.object({ id: z.string(), value: z.string().min(1) }),
          ),
        }),
        "Find product option with values by id",
      ),
      404: jsonContent(
        { status: 404, message: "ProductOption not found" },
        "ProductOption not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static update = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}",
    method: "put",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          optionId: z.string().min(12).max(12),
        })
        .strict(),
      body: jsonContentRequired(
        productOptionSchema.update,
        "Product option update payload",
      ),
    },
    responses: {
      200: jsonContent(
        z.object({
          id: z.string(),
          name: z.string().min(1),
          values: z.array(
            z.object({ id: z.string(), value: z.string().min(1) }),
          ),
        }),
        "Update product option",
      ),
      404: jsonContent(
        { status: 404, message: "ProductOption not found" },
        "ProductOption not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static updateValue = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}/values/{valueId}",
    method: "put",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          optionId: z.string().min(12).max(12),
          valueId: z.string().min(12).max(12),
        })
        .strict(),
      body: jsonContent(
        productOptionValueSchema.update,
        "Product option value update payload",
      ),
    },
    responses: {
      200: jsonContent(
        productOptionValueSchema.select,
        "Update product option value",
      ),
      404: jsonContent(
        { status: 404, message: "ProductOptionValue not found" },
        "ProductOptionValue not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static remove = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}",
    method: "delete",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          optionId: z.string().min(12).max(12),
        })
        .strict(),
    },
    responses: {
      200: jsonContent(productOptionSchema.select, "Product option removed"),
      404: jsonContent(
        { status: 404, message: "ProductOption not found" },
        "ProductOption not found",
      ),
      409: jsonContent({ status: 409, message: "Conflict" }, "Conflict"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static removeValue = createRoute({
    tags: ProductOptionRoute.tags,
    path: "/products/{productId}/options/{optionId}/values/{valueId}",
    method: "delete",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          optionId: z.string().min(12).max(12),
          valueId: z.string().min(12).max(12),
        })
        .strict(),
    },
    responses: {
      200: jsonContent(
        productOptionValueSchema.select,
        "Product option value removed",
      ),
      404: jsonContent(
        { status: 404, message: "ProductOptionValue not found" },
        "ProductOptionValue not found",
      ),
      409: jsonContent({ status: 409, message: "Conflict" }, "Conflict"),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });
}
