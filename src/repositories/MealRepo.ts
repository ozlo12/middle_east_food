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
    const data = await this.db.getData("/meals");
    const list: MealDoc[] = [];
    data.forEach((d) => {
      list.push(d as any);
    });
    console.log(list);
    return list;
  }

  watchAll() {
    throw new Error("Method not implemented.");
  }

  findById(): Promise<MealDoc> {
    throw new Error("Method not implemented.");
  }

  watchById() {
    throw new Error("Method not implemented.");
  }

  updateById(id: string, doc: Partial<MealDoc>): Promise<MealDoc> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
