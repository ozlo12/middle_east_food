import { singleton } from "tsyringe";
import { ModelContract } from "@/contracts/ModelContract";
import { MealDoc } from "@/models/Meal";
import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
// import { DataSnapshot } from "firebase/database";
import { Repo } from "./Repo";

@singleton()
export class MealRepo extends Repo<MealDoc> implements ModelContract<MealDoc> {
  doc = "/meals/";
  constructor(protected db: FirebaseClientDB) {
    super();
  }
}
