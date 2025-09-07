import pino, { TransportSingleOptions } from "pino";
import { CONFIG } from "@/config/config";
import { getCurrentDateTime } from "@/utils/date-time.utils";

class Logger {
  private static _instance: pino.Logger | null = null;

  private constructor() { }

  public static get instance() {
    if (Logger._instance) return Logger._instance;

    let transport: TransportSingleOptions | undefined;

    if (!CONFIG.IS_ENV_PROD) {
      transport = {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
          messageFormat: "{msg}\nmethod: {method}\nurl: {url}\nstatus: {statusCode}"
        }
      };
    }

    Logger._instance = pino({
      level: CONFIG.LOG_LEVEL, // Set log level based on environment
      timestamp: () => `,"timestamp":"${getCurrentDateTime()}"`,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
        bindings: (bindings) => {
          return {
            pid: bindings.pid,
            host: bindings.hostname,
            node_version: process.version
          };
        },
      },
      transport
    });

    return Logger._instance;
  }
}

export const logger = Logger.instance;
