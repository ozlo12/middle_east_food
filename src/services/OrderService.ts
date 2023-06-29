import { singleton } from "tsyringe";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { Cart, Contact } from "@/models/User";
import { FirebaseAuth } from "./firebase/auth/Auth";

@singleton()
export class OrderService {
  constructor(private db: FirebaseClientDB, private auth: FirebaseAuth) {}

  async createOrder(contact: Contact, cart: Cart) {
    if (!this.auth.user) throw new Error("No signed in user to take an order");
    console.log(contact);
    const { uid } = this.auth.user;
    // Add order to user
    await this.db.pushData(`users/${uid}/orders`, cart);
    // Add order to Order list
    return this.db.pushData("/orders/active", {
      order: cart,
      createdBy: { uid, contact },
    });
  }
}
