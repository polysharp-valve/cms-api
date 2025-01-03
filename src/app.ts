import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";

import router from "./router.js";

import type { AppBindings } from "./types.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";

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
  })
);

app.route("/", router);

export default {
  port: 3000,
  fetch: app.fetch,
};
