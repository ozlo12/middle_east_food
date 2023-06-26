import { FirebaseClientApp } from "@/services/firebase/firebase-client-app";
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseAuth {
  auth: Auth;

  constructor(clientApp: FirebaseClientApp) {
    this.auth = getAuth(clientApp.app);
  }

  get user() {
    return this.auth.currentUser;
  }

  onAuthStateChanged(fn: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, fn);
  }

  signOut() {
    return signOut(this.auth);
  }
}
