import { singleton } from "tsyringe";
import { Database, getDatabase } from "firebase-admin/database";
import { FirebaseAdminApp } from "./firebase-admin-app";

@singleton()
export class FirebaseAdminDB {
  private _db: Database;
  constructor(private firebaseApp: FirebaseAdminApp) {
    this._db = getDatabase(this.firebaseApp.app);
  }

  get db() {
    return this._db;
  }
}
