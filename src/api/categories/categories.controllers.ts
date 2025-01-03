import type { Context } from "hono";
import type { AppRouteHandler } from "../../types.js";
import type { Create, FindAll } from "./categories.routes.js";

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
];

export const findAll: AppRouteHandler<FindAll> = (c: Context) => {
  return c.json(categories);
};

export const create: AppRouteHandler<Create> = async (c: Context) => {
  const { name } = await c.req.json();
  categories.push({
    id: categories.length + 1,
    name,
  });

  return c.json({ message: "created" } as never, 201);
};
