import { ModelContract } from "@/contracts/ModelContract";
import { UserDoc } from "@/models/User";
import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
import { singleton } from "tsyringe";
import { Repo } from "./Repo";

@singleton()
export class UserRepo extends Repo<UserDoc> implements ModelContract<UserDoc> {
  doc = "/users/";
  constructor(protected db: FirebaseClientDB) {
    super();
  }
}
