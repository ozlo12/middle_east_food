import { ModelContract } from "@/contracts/ModelContract";
import { DataSnapshot } from "firebase/database";

export interface Cart {
  items: { name: string; image: string; quantity: number; price: number }[];
  totalPrice: number;
}

export interface UserDoc {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  city: string;
  cart: Cart;
  orders: Cart[];
}

export class User implements ModelContract<UserDoc> {
  create(doc: Omit<UserDoc, "id">): Promise<UserDoc> {
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
