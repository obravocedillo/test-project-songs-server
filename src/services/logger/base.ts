export interface IBaseLogger {
  info(message: string, context?: Record<string, any>): void;
  debug(message: string, context?: Record<string, any>): void;
  error(message: string, context?: Record<string, any>): void;
  warn(message: string, context?: Record<string, any>): void;
  createChildLogger(context: string): IBaseLogger;
}

export abstract class BaseLogger implements IBaseLogger {
  protected context: string | undefined;

  constructor(context?: string) {
    this.context = context;
  }

  abstract info(message: string, context?: Record<string, any>): void;
  abstract debug(message: string, context?: Record<string, any>): void;
  abstract warn(message: string, context?: Record<string, any>): void;
  abstract error(message: string, context?: Record<string, any>): void;

  abstract createChildLogger(context: string): IBaseLogger;
}
