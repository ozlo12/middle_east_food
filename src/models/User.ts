import { ModelContract } from "@/contracts/ModelContract";
import { DataSnapshot } from "firebase/database";
import { MealDoc } from "./Meal";
export interface CartItem {
  quanitity: number;
  item: MealDoc;
}

export class Cart {
  items: CartItem[];
  totalPrice: number;

  constructor(cart?: Cart) {
    this.items = [...(cart?.items ?? [])];
    this.totalPrice = cart?.totalPrice || 0;
  }

  addItem(item: MealDoc): void {
    const actualItem = this.items.find((i) => i.item.id === item.id);

    if (actualItem) ++actualItem.quanitity;
    else this.items.push({ item, quanitity: 1 });

    this.totalPrice += item.price;
  }

  removeItem(item: MealDoc) {
    const actualItem = this.items.find(({ item }) => item.id === item.id);
    if (!actualItem) throw new Error("You try to remove item not exist at all");

    if (actualItem.quanitity > 1) --actualItem.quanitity;
    else this.items = this.items.filter((i) => i !== actualItem);

    this.totalPrice -= item.price;
  }
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  city: string;
}

export interface UserDoc {
  id?: string;
  contactInfo?: ContactInfo;
  cart?: Cart;
  orders: Cart[];
}

export class User implements ModelContract<UserDoc> {
  create(doc: UserDoc): Promise<UserDoc> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<UserDoc[]> {
    throw new Error("Method not implemented.");
  }
  watchAll(fn: (snap: DataSnapshot) => void): () => void {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<UserDoc> {
    throw new Error("Method not implemented.");
  }
  watchById(id: string, fn: (data: DataSnapshot) => void): () => void {
    throw new Error("Method not implemented.");
  }
  updateById(id: string, doc: Partial<UserDoc>): Promise<UserDoc> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
