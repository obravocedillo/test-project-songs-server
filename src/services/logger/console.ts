import { BaseLogger, IBaseLogger } from "./base";

export class ConsoleLogger extends BaseLogger {
  constructor(context?: string) {
    super(context);
  }

  info(message: string, context?: Record<string, any>): void {
    console.log(message, JSON.stringify(context));
  }

  debug(message: string, context?: Record<string, any>): void {
    console.debug(message, JSON.stringify(context));
  }

  warn(message: string, context?: Record<string, any>): void {
    console.warn(message, JSON.stringify(context));
  }

  error(message: string, context?: Record<string, any>): void {
    console.error(message, JSON.stringify(context));
  }

  createChildLogger(newContext: string): IBaseLogger {
    return new ConsoleLogger(`${this.context}:${newContext}`);
  }
}
