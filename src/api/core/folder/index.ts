import defaultHook from "stoker/openapi/default-hook";

import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

import FolderController from "./controller";
import FolderRoute from "./route";

const router = new OpenAPIHono<AppBindings>({
  defaultHook,
});

router.openapi(FolderRoute.create, FolderController.create);
router.openapi(FolderRoute.find, FolderController.find);
router.openapi(FolderRoute.findOne, FolderController.findOne);
router.openapi(FolderRoute.update, FolderController.update);
router.openapi(FolderRoute.remove, FolderController.remove);

export default router;
