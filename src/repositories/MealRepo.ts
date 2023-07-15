import { singleton } from "tsyringe";
import { ModelContract } from "@/contracts/ModelContract";
// import { MealDoc } from "@/models/Meal";
import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
import { Repo } from "./Repo";

@singleton()
export class MealRepo extends Repo<Meal> implements ModelContract<Meal> {
  doc = "/meals/";
  constructor(protected db: FirebaseClientDB) {
    super();
  }
}
