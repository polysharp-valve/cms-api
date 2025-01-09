import { AppRouteHandler } from "@/types";

import { Create, Find, FindOne, Remove, Update } from "./route";
import MediaService from "./service";
import { blobStorage } from "@/helpers/storage";

export default abstract class MediaController {
  public static create: AppRouteHandler<Create> = async (c) => {
    const { file } = c.req.valid("form");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const upload = await blobStorage.upload(buffer, "/mon/image");

    return c.json({ url: upload }, 201);
  };

  public static find: AppRouteHandler<Find> = async (c) => {
    const res = await MediaService.find();
    return c.json(res, 501);
  };

  public static findOne: AppRouteHandler<FindOne> = async (c) => {
    const res = await MediaService.findOne();
    return c.json(res, 501);
  };

  public static update: AppRouteHandler<Update> = async (c) => {
    const res = await MediaService.update();
    return c.json(res, 501);
  };

  public static remove: AppRouteHandler<Remove> = async (c) => {
    const res = await MediaService.remove();
    return c.json(res, 501);
  };
}
