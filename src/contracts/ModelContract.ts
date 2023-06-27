import { DataSnapshot } from "firebase/database";

export interface ModelContract<T> {
  create(doc: T): Promise<T>;
  getAll(): Promise<T[]>;
  watchAll(fn: (snap: DataSnapshot) => void): () => void;
  findById(id: string): Promise<T>;
  watchById(id: string, fn: (data: DataSnapshot) => void): () => void;
  updateById(id: string, doc: Partial<T>): Promise<T>;
  deleteById(id: string): Promise<void>;
}
