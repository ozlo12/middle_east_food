import { ModelContract } from "@/contracts/ModelContract";
import { MealDoc } from "@/models/Meal";
import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
import { singleton } from "tsyringe";

@singleton()
export class MealRepo implements ModelContract<MealDoc> {
  constructor(private db: FirebaseClientDB) {}

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

  watchAll() {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<MealDoc> {
    const snap = await this.db.getData("/meals/" + id);
    if (snap.exists()) {
      return { id: snap.key, ...snap.val() };
    }
    throw new Error("Data not found");
  }

  watchById(id: string) {
    throw new Error("Method not implemented.");
  }

  updateById(id: string, doc: Partial<MealDoc>): Promise<MealDoc> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
