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

  get isAuthenticated(): Promise<User | null> {
    return new Promise((res, rej) => {
      const dispose = onAuthStateChanged(
        this.auth,
        (user) => {
          dispose();
          return res(user);
        },
        (err) => {
          return rej(err);
        }
      );
    });
  }

  onAuthStateChanged(
    fn: (user: User | null) => void,
    errFn?: (err: Error) => void
  ): () => void {
    return onAuthStateChanged(this.auth, fn, errFn);
  }

  signOut() {
    return signOut(this.auth);
  }
}
