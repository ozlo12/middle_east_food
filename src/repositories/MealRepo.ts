import { singleton } from "tsyringe";
import { ModelContract } from "@/contracts/ModelContract";
import { MealDoc } from "@/models/Meal";
import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
import { DataSnapshot } from "firebase/database";

@singleton()
export class MealRepo implements ModelContract<MealDoc> {
  constructor(private db: FirebaseClientDB) {}
  watchById(id: string, fn: (data: DataSnapshot) => void): () => void {
    return this.db.watch("/meals/" + id, fn);
  }
  watchAll(fn: (snap: DataSnapshot) => void): () => void {
    return this.db.watch("meals", fn);
  }

  async create(doc: MealDoc): Promise<MealDoc> {
    const key = (await this.db.pushData("/meals", doc)).key;
    const data = await this.db.getData("meals/" + key);
    const val = data.val();
    console.log(val);
    return val;
  }
  async getAll(): Promise<MealDoc[]> {
    const snap = await this.db.getData("/meals");
    if (snap.exists()) {
      const val = snap.val();
      return Object.keys(val).map((k) => ({ id: k, ...val[k] }));
    }
    return [];
  }

  async findById(id: string): Promise<MealDoc> {
    const snap = await this.db.getData("/meals/" + id);
    if (snap.exists()) {
      return { id: snap.key, ...snap.val() };
    }
    throw new Error("Data not found");
  }

  updateById(id: string, doc: Partial<MealDoc>): Promise<MealDoc> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
