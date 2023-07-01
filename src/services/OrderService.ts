import { singleton } from "tsyringe";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { Cart, Contact } from "@/models/User";
import { FirebaseAuth } from "./firebase/auth/Auth";

import { OrderContract } from "@/contracts/OrderContract";

@singleton()
export class OrderService {
  constructor(private db: FirebaseClientDB, private auth: FirebaseAuth) {}

  async createOrder(contact: Contact, cart: Cart) {
    if (!this.auth.user) throw new Error("No signed in user to take an order");
    const { uid } = this.auth.user;
    // Add order to user
    await this.db.pushData(`users/${uid}/orders`, cart);
    // Add order to Order list
    const order = await this.db.pushData("/orders/", {
      order: cart,
      createdBy: uid,
      contact,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact }),
    });
    console.log(await res.json());

    return order;
  }

  async getOrder(id: string): Promise<OrderContract> {
    const order = await this.db.getData("/orders/" + id);
    return { id: order.key, ...order.val() };
  }

  watchOrders(fn: (orders: OrderContract[]) => void) {
    return this.db.watch("/orders/", (snap) => {
      if (!snap.exists()) return fn([]);
      fn(this.db.extractKeys(snap.val()));
    });
  }

  toggleOrder(id: string, status: OrderContract["status"]) {
    return this.db.updateData("/orders/" + id, { status });
  }
}
