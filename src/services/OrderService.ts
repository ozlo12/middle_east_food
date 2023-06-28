import { singleton } from "tsyringe";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { Cart, Contact } from "@/models/User";
import { FirebaseAuth } from "./firebase/auth/Auth";

@singleton()
export class OrderService {
  constructor(private db: FirebaseClientDB, private auth: FirebaseAuth) {}
  private getUserOrderUrl(uid: string) {
    return `/users/${uid}/orders/`;
  }

  private getNewOrdersUrl() {
    return "/orders/new/";
  }

  private getAllOrdersUrl() {
    return "/orders/";
  }

  async createOrder(contact: Contact, cart: Cart) {
    if (!this.auth.user) throw new Error("No signed in user to take an order");
    const { uid } = this.auth.user;
    const newOrdersUrl = this.getNewOrdersUrl();
    const userOrderUrl = this.getUserOrderUrl(uid);
    await this.db.setData(userOrderUrl, cart);
    return this.db.pushData(newOrdersUrl, { ...cart, contact });
  }
}
