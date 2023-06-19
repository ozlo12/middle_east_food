import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseAppService {
  private config: FirebaseOptions;
  private _app: FirebaseApp;
  constructor() {
    this.config = {
      apiKey: "AIzaSyAVLSKI0vD7bKKsT7uaMoPpWVBppl-6RYM",
      projectId: "test-project",
      // databaseURL: process.env.FIREBASE_DB_URL,
    };
    this._app = initializeApp(this.config);
  }
  get app() {
    return this._app;
  }
}
