import { singleton } from "tsyringe";
import { FirebaseAdminApp } from "./firebase-admin-app";
import { Database, getDatabase } from "firebase-admin/database";

@singleton()
export class FirebaseAdminDB {
  _db: Database;
  constructor(app: FirebaseAdminApp) {
    this._db = getDatabase(app.app);
  }

  get db() {
    return this._db;
  }

  extractKeys(obj: object) {
    return Object.entries(obj).map(([key, val]) => ({ id: key, ...val }));
  }
  setData(path: string, data: any) {
    return this._db.ref(path).set(data);
  }

  updateData(path: string, data: any) {
    return this._db.ref(path).update(data);
  }

  pushData(path: string, data: any) {
    return this._db.ref(path).push(data);
  }

  deleteData(path: string) {
    return this._db.ref(path).remove();
  }

  getData(path: string) {
    return this._db.ref(path).get();
  }
}
