import { singleton } from "tsyringe";
import { FirebaseClientDB } from "./firebase/firebase-client-db";

@singleton()
export class MealService {
  private path = "/meals/";

  constructor(private db: FirebaseClientDB) {}

  watchMeals(fn: (meals: Meal[]) => void) {
    return this.db.watch("/meals/", (snap) => {
      if (snap.exists()) fn(this.db.extractKeys(snap.val()));
      else fn([]);
    });
  }

  async findById(id: string): Promise<Meal | null> {
    const snap = await this.db.getData(this.path + id);
    return (snap.exists() && { ...snap.val(), id }) || null;
  }

  async watchById(id: string, fn: (meal: Meal | null) => void) {
    return this.db.watch(this.path + id, (snap) => {
      if (snap.exists()) return fn({ id, ...snap.val() });
      return fn(null);
    });
  }

  update(id: string, meal: Partial<Meal>) {
    return this.db.updateData(this.path + id, meal);
  }

  async create(meal: Meal) {
    return this.db.pushData(this.path, meal);
  }
}
