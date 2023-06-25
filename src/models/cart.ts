import { ModelContract } from "@/contracts/ModelContract";
import { DataSnapshot } from "firebase/database";

export interface CartItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface CartDoc {
  uid: string;
  items: CartItem[];
  total: number;
  vat?: number;
}

export class Cart implements ModelContract<CartDoc> {
  create(doc: Omit<CartDoc, "id">): Promise<CartDoc> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<CartDoc[]> {
    throw new Error("Method not implemented.");
  }
  watchAll(fn: (snap: DataSnapshot) => void): () => void {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<CartDoc> {
    throw new Error("Method not implemented.");
  }
  watchById(id: string, fn: (data: DataSnapshot) => void): () => void {
    throw new Error("Method not implemented.");
  }
  updateById(id: string, doc: Partial<CartDoc>): Promise<CartDoc> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
