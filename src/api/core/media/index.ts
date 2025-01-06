import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import MediaController from "./controller";
import MediaRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(MediaRoute.create, MediaController.create);
router.openapi(MediaRoute.find, MediaController.find);
router.openapi(MediaRoute.findOne, MediaController.findOne);
router.openapi(MediaRoute.update, MediaController.update);
router.openapi(MediaRoute.remove, MediaController.remove);

export default router;
