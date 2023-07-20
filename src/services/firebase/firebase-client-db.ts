import { singleton } from "tsyringe";
import { FirebaseClientApp } from "./firebase-client-app";
import {
  DataSnapshot,
  Database,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

@singleton()
export class FirebaseClientDB {
  private _db: Database;
  constructor(clientApp: FirebaseClientApp) {
    this._db = getDatabase(clientApp.app);
  }

  get db() {
    return this._db;
  }

  extractKeys(obj: object) {
    return Object.entries(obj).map(([key, val]) => ({ id: key, ...val }));
  }

  setData(path: string, data: any) {
    return set(ref(this._db, path), data);
  }

  updateData(path: string, data: any) {
    return update(ref(this._db, path), data);
  }

  pushData(path: string, data: any) {
    return push(ref(this._db, path), data);
  }

  deleteData(path: string) {
    return remove(ref(this._db, path));
  }

  watch(path: string, fn: (snap: DataSnapshot) => void) {
    return onValue(ref(this._db, path), fn);
  }

  getData(path: string) {
    return get(ref(this._db, path));
  }
}
