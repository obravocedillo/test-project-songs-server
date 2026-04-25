import { Logger, createLogger, format, transports } from "winston";
import { BaseLogger, IBaseLogger } from "./base";

export class WinstonLogger extends BaseLogger {
  private winstonLogger: Logger;

  static winstonInstances: Map<string, WinstonLogger> = new Map();

  private constructor(context?: string) {
    super(context);

    this.winstonLogger = this.initializeWinston();
  }

  private initializeWinston() {
    return createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ timestamp, level, message, context, ...meta }) => {
              let msg = `${timestamp} [${level}]`;

              if (context) {
                msg += ` [${context}]`;
              }

              msg += `: ${message}`;

              // Add metadata if exists
              if (Object.keys(meta).length > 0) {
                msg += ` ${JSON.stringify(meta)}`;
              }

              return msg;
            }),
          ),
        }),
      ],
    });
  }

  static getInstance(context: string): WinstonLogger {
    const foundLogger = WinstonLogger.winstonInstances.get(context);

    if (!foundLogger) {
      const newInstance = new WinstonLogger();

      WinstonLogger.winstonInstances.set(context, newInstance);

      return newInstance;
    }

    return foundLogger;
  }

  info(message: string, context?: Record<string, any>): void {
    this.winstonLogger.info(message, context);
  }

  debug(message: string, context?: Record<string, any>): void {
    this.winstonLogger.debug(message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.winstonLogger.warn(message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.winstonLogger.error(message, context);
  }

  createChildLogger(newContext: string): IBaseLogger {
    const childContext = `${this.context}:${newContext}`;

    return WinstonLogger.getInstance(childContext);
  }
}
