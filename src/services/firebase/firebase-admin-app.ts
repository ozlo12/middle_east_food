import { credential } from "firebase-admin";
import { App, getApps, initializeApp } from "firebase-admin/app";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseAdminApp {
  app: App;
  constructor() {
    this.app =
      getApps()[0] ||
      initializeApp({
        credential: credential.cert(this.serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
      });
  }

  private get serviceAccount() {
    const stringServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!stringServiceAccount)
      throw new Error("Service account variable not exist!");

    return JSON.parse(stringServiceAccount);
  }
}
