import { Cart, Contact } from "@/models/User";

export interface OrderContract {
  id?: string;
  createdAt: string;
  createdBy: string;
  contact: Contact;
  order: Cart;
  status: "new" | "completed";
}
