import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { productVariantSchema } from "@/database/schemas/product-variant";
import { createRoute, z } from "@hono/zod-openapi";

export type Create = typeof ProductVariantRoute.create;
export type Find = typeof ProductVariantRoute.find;
export type FindOne = typeof ProductVariantRoute.findOne;
export type Update = typeof ProductVariantRoute.update;
export type Remove = typeof ProductVariantRoute.remove;

export default abstract class ProductVariantRoute {
  private static tags = ["ProductVariant"];

  public static create = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants",
    method: "post",
    request: {
      params: z.object({ productId: z.string().min(12).max(12) }).strict(),
      body: jsonContentRequired(
        productVariantSchema.insert.extend({
          optionValueIds: z.array(z.string().min(12).max(12)),
        }),
        "Product variant creation payload",
      ),
    },
    responses: {
      201: jsonContent(productVariantSchema.select, "Create product variant"),
      500: jsonContent(
        { status: 500, message: " Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static find = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants",
    method: "get",
    request: {
      params: z.object({ productId: z.string().min(12).max(12) }).strict(),
    },
    responses: {
      200: jsonContent(
        z.array(
          productVariantSchema.select.extend({
            productOptionValues: z.array(
              z.object({
                productOptionValue: z.object({
                  id: z.string().min(12).max(12),
                  value: z.string(),
                }),
              }),
            ),
          }),
        ),
        "Find product variants",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static findOne = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants/{variantId}",
    method: "get",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          variantId: z.string().min(12).max(12),
        })
        .strict(),
    },
    responses: {
      200: jsonContent(
        productVariantSchema.select.extend({
          productOptionValues: z.array(
            z.object({
              productOptionValue: z.object({
                id: z.string().min(12).max(12),
                value: z.string(),
              }),
            }),
          ),
        }),
        "Find product variant by id",
      ),
      404: jsonContent(
        { status: 404, message: "Product variant not found" },
        "Product variant not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static update = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants/{variantId}",
    method: "put",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          variantId: z.string().min(12).max(12),
        })
        .strict(),
      body: jsonContentRequired(
        productVariantSchema.update.extend({
          optionValueIds: z.array(z.string().min(12).max(12)).optional(),
        }),
        "Product variant update payload",
      ),
    },
    responses: {
      200: jsonContent(productVariantSchema.select, "Update product variant"),
      404: jsonContent(
        { status: 404, message: "Product variant not found" },
        "Product variant not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });

  public static remove = createRoute({
    tags: ProductVariantRoute.tags,
    path: "/products/{productId}/variants/{variantId}",
    method: "delete",
    request: {
      params: z
        .object({
          productId: z.string().min(12).max(12),
          variantId: z.string().min(12).max(12),
        })
        .strict(),
    },
    responses: {
      200: jsonContent(productVariantSchema.select, "Delete product variant"),
      404: jsonContent(
        { status: 404, message: "Product variant not found" },
        "Product variant not found",
      ),
      500: jsonContent(
        { status: 500, message: "Unexpected error" },
        "Unexpected error",
      ),
    },
  });
}
