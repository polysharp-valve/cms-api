import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status.js";
import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { ZodError } from "zod";

import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";

import { HttpError } from "./helpers/HttpError.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import router from "./router.js";

import type { AppBindings } from "./types.js";
const app = new OpenAPIHono<AppBindings>({
  defaultHook,
});

app.use(loggerMiddleware());

app.notFound(notFound);
app.onError(onError);

app.doc("/reference", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Valve CMS API",
  },
});

app.get(
  "/doc",
  apiReference({
    theme: "kepler",
    layout: "classic",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
    spec: {
      url: "/reference",
    },
  }),
);

app.route("/", router);

app.onError((err: Error | HttpError, c: Context) => {
  if (err instanceof HttpError && err.statusCode < 500) {
    return c.json(
      {
        status: err.statusCode,
        message: err.message,
        cause: err.cause,
      },
      err.statusCode as ContentfulStatusCode,
    );
  }

  if (err instanceof ZodError) {
    return c.json(err, 400);
  }

  return c.json({ message: "Unexpected error" }, 500);
});

export default {
  port: 3000,
  fetch: app.fetch,
};
