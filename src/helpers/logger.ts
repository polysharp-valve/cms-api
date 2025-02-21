import fs from "fs";
import pino, { type LoggerOptions } from "pino";
import pinoPretty from "pino-pretty";

const REDACT_PATHS = [
  "email",
  "*.email",
  "[*].email",
  "[*].*.email",

  "password",
  "*.password",
  "[*].password",
  "[*].*.password",
];

export class Logger {
  public readonly logger: pino.Logger;

  constructor(nodeEnv: string, logsDir: string = "./logs") {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const streams = [
      {
        level: "info",
        stream:
          nodeEnv === "development"
            ? pinoPretty({ colorize: true, ignore: "pid,hostname" })
            : process.stdout,
      },
      {
        level: "info",
        stream: fs.createWriteStream(`${logsDir}/all.log`, { flags: "a" }),
      },
      {
        level: "error",
        stream: fs.createWriteStream(`${logsDir}/error.log`, { flags: "a" }),
      },
    ];

    const pinoOptions: LoggerOptions = {
      level: nodeEnv === "test" ? "silent" : "info",
      timestamp: pino.stdTimeFunctions.isoTime,
      nestedKey: "payload",
      redact: {
        paths: nodeEnv === "production" ? REDACT_PATHS : [],
        remove: true,
      },
      customLevels: {
        http: 35,
      },
    };

    this.logger = pino(pinoOptions, pino.multistream(streams));
  }

  public info(
    message: string,
    payload: Record<string, any> | unknown = {},
  ): void {
    this.logger.info(payload, message);
  }

  public warn(
    message: string,
    payload: Record<string, any> | unknown = {},
  ): void {
    this.logger.warn(payload, message);
  }

  public error(
    message: string,
    payload: Record<string, any> | unknown = {},
  ): void {
    this.logger.error(payload, message);
  }

  public fatal(
    message: string,
    payload: Record<string, any> | unknown = {},
  ): void {
    this.logger.fatal(payload, message);
  }
}

const nodeEnv = Bun.env.NODE_ENV;
if (!nodeEnv) {
  console.error("NODE_ENV missing");
  process.exit(1);
}

export default new Logger(nodeEnv);
