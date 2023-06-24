import type { RepositoryContract } from "@/contracts/RepositoryContract";
import { MealRepo } from "@/repositories/MealRepo";
import { inject, singleton } from "tsyringe";
import { ModelContract } from "../contracts/ModelContract";
import { DataSnapshot } from "firebase/database";

export interface MealDoc {
  id: string;
  name: string;
  description: string;
  categories: string;
  image: string;
  price: number;
  createdAt: string;
}
@singleton()
export class Meal implements ModelContract<MealDoc> {
  constructor(private repo: MealRepo) {}
  watchAll(fn: (sanp: DataSnapshot) => void) {
    return this.repo.watchAll(fn);
  }

  create(doc: MealDoc): Promise<MealDoc> {
    return this.repo.create(doc);
  }

  getAll(): Promise<MealDoc[]> {
    return this.repo.getAll();
  }

  findById(id: string): Promise<MealDoc> {
    return this.repo.findById(id);
  }

  watchById(id: string, fn: (snap: DataSnapshot) => void) {
    return this.repo.watchById(id, fn);
  }

  updateById(id: string, doc: Partial<MealDoc>): Promise<MealDoc> {
    return this.repo.updateById(id, doc);
  }
  deleteById(id: string): Promise<void> {
    return this.repo.deleteById(id);
  }
}
