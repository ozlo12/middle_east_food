import { singleton } from "tsyringe";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { MealDoc } from "@/models/Meal";

@singleton()
export class MealService {
  constructor(private db: FirebaseClientDB) {}

  watchMeals(fn: (meals: MealDoc[]) => void) {
    return this.db.watch("/meals/", (snap) => {
      if (snap.exists())
        fn(
          Object.entries(snap.val()).map(([key, value]) => ({
            id: key,
            ...(value as MealDoc),
          }))
        );
      else fn([]);
    });
  }
}
