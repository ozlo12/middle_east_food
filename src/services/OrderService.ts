import { singleton } from "tsyringe";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { FirebaseAuth } from "./firebase/auth/Auth";
import { MailService } from "./MailService";

@singleton()
export class OrderService {
  constructor(
    private db: FirebaseClientDB,
    private auth: FirebaseAuth,
    private mail: MailService
  ) {}

  async createOrder(
    order: Pick<Order, "cart" | "contact" | "extraInformation" | "payment">
  ) {
    if (!this.auth.user) throw new Error("No signed in user to take an order");
    const createdAt = new Date(Date.now()).toISOString();
    const createdBy = this.auth.user.uid;

    const fullOrder: Order = { ...order, createdAt, createdBy, status: "new" };

    // Add order to user.
    await this.db.pushData(`users/${createdBy}/orders`, {
      ...order,
      createdAt,
    });
    // Add order to Order list.
    await this.db.pushData("/orders/", { fullOrder });
    // Send email with order details.
    await this.mail.orderNotification(fullOrder);
    // const res = await fetch(`/api/email`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ contact }),
    // });
    // console.log(await res.json());

    return order;
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.db.getData("/orders/" + id);
    return { id: order.key, ...order.val() };
  }

  watchOrders(fn: (orders: Order[]) => void) {
    return this.db.watch("/orders/", (snap) => {
      if (!snap.exists()) return fn([]);
      fn(this.db.extractKeys(snap.val()));
    });
  }

  toggleOrder(id: string, status: Order["status"]) {
    return this.db.updateData("/orders/" + id, { status });
  }
}
