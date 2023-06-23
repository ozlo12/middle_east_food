import { App, getApps } from "firebase-admin/app";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseAdminApp {
  private _app!: App;
  constructor() {
    this._app =
      getApps()[0] ||
      initializeApp(
        {
          credential: applicationDefault(),
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
        },
        "admin-app"
      );
  }

  get app() {
    return this._app;
  }
}
