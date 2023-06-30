import { ModelContract } from "@/contracts/ModelContract";
import { singleton } from "tsyringe";
import { Cart, Contact } from "./User";

interface OrderItem {
  id?: string;
  order: Cart;
  createdAt: string;
  createdBy: Contact;
}
interface Orders {
  completedOrders: OrderItem[];
  activeOrders: OrderItem[];
}
@singleton()
export class Order {
  watchAll(fn: (orders: Orders) => void) {}
}
