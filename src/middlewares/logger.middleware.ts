import logger from "@/helpers/logger";
import { pinoLogger } from "hono-pino";

export default function () {
  return pinoLogger({
    pino: logger.logger,
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
