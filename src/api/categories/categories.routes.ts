import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";

const tags = ["categories"];

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const createCategorySchema = z.object({
  name: z.string(),
});

export const findAll = createRoute({
  path: "/categories",
  method: "get",
  tags,
  responses: {
    200: jsonContent(z.array(categorySchema), "The list of all categories"),
  },
});
export type FindAll = typeof findAll;

export const create = createRoute({
  path: "/categories",
  method: "post",
  tags,
  request: {
    body: jsonContent(createCategorySchema, "The category to create"),
  },
  responses: {
    201: jsonContent({ message: "created" }, "The list of all categories"),
  },
});
export type Create = typeof create;
