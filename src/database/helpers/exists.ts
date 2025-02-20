import { NotFound } from "@/helpers/HttpError";

export const validateEntities = async (
  ids: string[] | undefined,
  service: any,
  entityName: string,
) => {
  if (ids && ids.length) {
    const entitiesExist = await Promise.all(ids.map(service.findOne));
    if (entitiesExist.some((entity) => !entity)) {
      throw new NotFound(`One or more ${entityName} not found`);
    }
  }
};
