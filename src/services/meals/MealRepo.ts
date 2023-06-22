import { Meal } from "@/models/Meal";
import { singleton } from "tsyringe";
import { Repo } from "./repo-interface";

@singleton()
export class MealRepo implements Repo<Meal> {
  create(): Promise<Meal> {
    throw new Error("not implemented yet!");
  }

  async getAll(): Promise<Meal[]> {
    return [
      new Meal(
        "2df",
        "test name",
        "test description",
        ["vegan"],
        "https://lksdj.png",
        23,
        "2004-11-23"
      ),
    ];
  }

  getOneById(id: string): Promise<Meal> {
    throw new Error("not implemented yet!");
  }

  update(id: string, data: Partial<Meal>): Promise<Meal> {
    throw new Error("not implemented yet!");
  }

  delete(id: string): Promise<void> {
    throw new Error("not implemented yet!");
  }
}
