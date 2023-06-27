import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
import { DataSnapshot } from "firebase/database";

export abstract class Repo<T> {
  protected doc!: string;
  protected db!: FirebaseClientDB;

  watchById(id: string, fn: (data: DataSnapshot) => void): () => void {
    return this.db.watch(this.doc + id, fn);
  }
  watchAll(fn: (snap: DataSnapshot) => void): () => void {
    return this.db.watch(this.doc, fn);
  }

  async create(doc: T): Promise<T> {
    const key = (await this.db.pushData(this.doc, doc)).key;
    return this.findById(key!);
  }

  async getAll(): Promise<T[]> {
    const snap = await this.db.getData(this.doc);
    if (snap.exists()) {
      const val = snap.val();
      return Object.keys(val).map((k) => ({ id: k, ...val[k] }));
    }
    return [];
  }

  async findById(id: string): Promise<T> {
    const snap = await this.db.getData(this.doc + id);
    if (snap.exists()) {
      return { id: snap.key, ...snap.val() };
    }
    throw new Error("Data not found");
  }

  updateById(id: string, doc: Partial<T>): Promise<T> {
    this.db.updateData(this.doc + id, doc);
    return this.findById(id);
  }

  deleteById(id: string): Promise<void> {
    return this.db.deleteData(this.doc + id);
  }
}
