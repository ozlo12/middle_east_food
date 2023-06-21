import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseAppService {
  private config: FirebaseOptions;
  private _app: FirebaseApp;
  constructor() {
    this.config = {
      // apiKey: "AIzaSyBNJW0-uA0CYBiDzoB3ZbmUt8YLuYPk6To",
      // projectId:"middle-eastern-food",
      // databaseURL: process.env.FIREBASE_DB_URL,
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };
    this._app = initializeApp(this.config);
  }
  get app() {
    return this._app;
  }
}
