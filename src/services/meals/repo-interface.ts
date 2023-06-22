export interface Repo<T> {
  getAll(): Promise<T[]>;
  create(): Promise<T>;
  getOneById(id: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
