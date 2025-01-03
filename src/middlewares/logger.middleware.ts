import { pinoLogger } from "hono-pino";

import logger from "@/helpers/logger";

export default function () {
  return pinoLogger({
    pino: logger.logger,
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
