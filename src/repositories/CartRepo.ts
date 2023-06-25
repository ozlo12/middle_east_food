import { CartDoc } from "@/models/cart";
import { Repo } from "./Repo";
import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
import { ModelContract } from "@/contracts/ModelContract";

export class CartRepo extends Repo<CartDoc> implements ModelContract<CartDoc> {
  doc = "/cart/";

  constructor(protected db: FirebaseClientDB) {
    super();
  }
}
