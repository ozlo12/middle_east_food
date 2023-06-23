export interface ModelContract<T> {
  create(doc: T): Promise<T>;
  getAll(): Promise<T[]>;
  watchAll(): any;
  findById(id: string): Promise<T>;
  watchById(id: string): any;
  updateById(id: string, doc: Partial<T>): Promise<T>;
  deleteById(id: string): Promise<void>;
}
