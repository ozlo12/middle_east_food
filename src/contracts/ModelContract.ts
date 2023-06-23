export interface ModelContract<T> {
  create(doc: T): Promise<T>;
  getAll(): Promise<T[]>;
  watchAll(): any;
  findById(): Promise<T>;
  watchById(): any;
  updateById(id: string, doc: Partial<T>): Promise<T>;
  deleteById(id: string): Promise<void>;
}
