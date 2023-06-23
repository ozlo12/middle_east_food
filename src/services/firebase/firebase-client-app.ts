import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseClientApp {
  private config: FirebaseOptions;
  private _app: FirebaseApp;
  constructor() {
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };
    this._app = initializeApp(this.config, "client-app");
  }
  get app() {
    return this._app;
  }
}
