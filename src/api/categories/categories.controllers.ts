import { AppRouteHandler } from "@/types.js";

import CategoriesService from "./categories.services.js";

import type { Create, FindAll, Remove, Update } from "./categories.routes.js";

export const findAll: AppRouteHandler<FindAll> = async (c) => {
  const categories = await CategoriesService.findAll();

  return c.json(categories);
};

export const create: AppRouteHandler<Create> = async (c) => {
  const body = c.req.valid("json");

  if (body.parentId) {
    const parentExists = await CategoriesService.exists(body.parentId);
    if (!parentExists) {
      return c.json({ message: "Parent category does not exist" }, 400);
    }
  }

  const categoryCreated = await CategoriesService.create(body);

  return c.json(categoryCreated, 201);
};

export const update: AppRouteHandler<Update> = async (c) => {
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  const categoryExists = await CategoriesService.exists(id);
  if (!categoryExists) {
    return c.json({ message: "Category does not exist" }, 404);
  }

  const categoryUpdated = await CategoriesService.update(id, body);

  return c.json(categoryUpdated, 200);
};

export const remove: AppRouteHandler<Remove> = async (c) => {
  const { id } = c.req.valid("param");

  const categoryExists = await CategoriesService.exists(id);
  if (!categoryExists) {
    return c.json({ message: "Category does not exist" }, 404);
  }

  await CategoriesService.remove(id);

  return c.json({ message: "Ok" }, 200);
};
