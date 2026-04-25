import { IBaseLogger } from "../services/logger/base";
import { baseLogger } from "../services/logger/factory";

export abstract class BaseLoader {
  protected loaderName: string;
  protected loaderLogger: IBaseLogger;

  constructor(loaderName: string) {
    this.loaderName = loaderName;
    this.loaderLogger = baseLogger.createChildLogger("Loader");
  }

  protected abstract load(param?: any): Promise<any>;

  async execute<T = any, P = any>(param?: P): Promise<T> {
    try {
      this.loaderLogger.info(`Excuting loader ${this.loaderName}`);
      const result = await this.load(param);
      this.loaderLogger.info(`Loader ${this.loaderName} completed`);
      return result;
    } catch (error) {
      this.loaderLogger.error(`Error executing loader ${this.loaderName}:`, {
        error,
      });
      throw error;
    }
  }
}
