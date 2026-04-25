import { IBaseLogger } from "./base";
import { ConsoleLogger } from "./console";
import { WinstonLogger } from "./winston";

type LoggerType = "winston" | "console";

export class LoggerFactory {
  static createLogger(type: LoggerType, context = "main"): IBaseLogger {
    switch (type) {
      case "winston":
        return WinstonLogger.getInstance(context);

      case "console":
        return new ConsoleLogger(context);
    }
  }
}

export const baseLogger = LoggerFactory.createLogger("winston");
