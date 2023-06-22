import { singleton } from "tsyringe";
import { FirebaseClientApp } from "./firebase-client-app";
import { Database, getDatabase } from "firebase/database";

@singleton()
export class FirebaseClientDB {
  private _db: Database;
  constructor(clientApp: FirebaseClientApp) {
    this._db = getDatabase(clientApp.app);
  }

  get db() {
    return this._db;
  }
}
