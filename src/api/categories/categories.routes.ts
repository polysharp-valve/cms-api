import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import { createRoute } from "@hono/zod-openapi";

import { categoriesSchema } from "./categories.schema";

const tags = ["categories"];

export const findAll = createRoute({
  path: "/categories",
  method: "get",
  tags,
  responses: {
    200: jsonContent(
      z.array(categoriesSchema.select),
      "The list of all categories"
    ),
  },
});
export type FindAll = typeof findAll;

export const create = createRoute({
  path: "/categories",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      categoriesSchema.insert,
      "The category to create"
    ),
  },
  responses: {
    201: jsonContent(categoriesSchema.select, "The list of all categories"),
    400: jsonContent(
      z.object({ message: z.string() }),
      "The parent category does not exist"
    ),
  },
});
export type Create = typeof create;

export const update = createRoute({
  path: "/categories/{id}",
  method: "put",
  tags,
  request: {
    params: z.object({ id: z.string() }),
    body: jsonContentRequired(
      categoriesSchema.update,
      "The category to update"
    ),
  },
  responses: {
    200: jsonContent(categoriesSchema.select, "The updated category"),
    404: jsonContent(
      z.object({ message: z.string() }),
      "The category does not exist"
    ),
  },
});
export type Update = typeof update;

export const remove = createRoute({
  path: "/categories/{id}",
  method: "delete",
  tags,
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: jsonContent(z.object({ message: z.string() }), "The updated category"),
    404: jsonContent(
      z.object({ message: z.string() }),
      "The category does not exist"
    ),
  },
});
export type Remove = typeof remove;
