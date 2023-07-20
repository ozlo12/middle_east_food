import { singleton } from "tsyringe";
import { FirebaseAdminDB } from "./firebase/firebase-admin-db";

@singleton()
export class MealAdminService {
  private path = "/meals/";

  constructor(private db: FirebaseAdminDB) {}

  async getAll(): Promise<Meal[]> {
    const snap = await this.db.getData(this.path);
    try {
      return this.db.extractKeys(snap.val());
    } catch (err) {
      return [];
    }
  }

  async findById(id: string): Promise<Meal | null> {
    const snap = await this.db.getData(this.path + id);
    if (snap.exists()) return { ...snap.val(), id };
    return null;
  }
}
