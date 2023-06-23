import type { RepositoryContract } from "@/contracts/RepositoryContract";
import { MealRepo } from "@/repositories/MealRepo";
import { inject, singleton } from "tsyringe";
import { ModelContract } from "../contracts/ModelContract";

export interface MealDoc {
  id: string;
  name: string;
  description: string;
  categories: string[];
  image: string;
  price: number;
  createdAt: string;
}
@singleton()
export class Meal implements ModelContract<MealDoc> {
  constructor(private repo: MealRepo) {}
  watchAll() {
    throw new Error("Method not implemented.");
  }

  create(doc: MealDoc): Promise<MealDoc> {
    return this.repo.create(doc);
  }

  getAll(): Promise<MealDoc[]> {
    return this.repo.getAll();
  }

  findById(): Promise<MealDoc> {
    throw new Error("Method not implemented.");
  }

  watchById() {
    return this.repo.watchById();
  }

  updateById(id: string, doc: Partial<MealDoc>): Promise<MealDoc> {
    return this.repo.updateById(id, doc);
  }
  deleteById(id: string): Promise<void> {
    return this.repo.deleteById(id);
  }
}
