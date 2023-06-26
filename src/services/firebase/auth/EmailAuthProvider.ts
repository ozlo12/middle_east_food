import { EmailAuthProviderContract } from "@/contracts/AuthProviderContract";
import { FirebaseClientApp } from "@/services/firebase/firebase-client-app";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseEmailAuthProvider
  implements EmailAuthProviderContract<UserCredential>
{
  private auth: Auth;
  constructor(clientApp: FirebaseClientApp) {
    this.auth = getAuth(clientApp.app);
  }
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  signOut() {
    return signOut(this.auth);
  }
  get user(): any {
    return this.auth.currentUser;
  }
}
