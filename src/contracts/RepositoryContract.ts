import { ModelContract } from "./ModelContract";

export interface RepositoryContract<T> {
  create(path: string, data: any): Promise<void>;
  update(path: string, data: any): Promise<void>;
  get(path: string): Promise<any>;
  watch(path: string): Promise<any>;
  delete(path: string): Promise<void>;
}
