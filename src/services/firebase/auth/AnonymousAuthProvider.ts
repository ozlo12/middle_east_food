import { AnonymousAuthProviderContract } from "@/contracts/AuthProviderContract";
import { FirebaseClientApp } from "@/services/firebase/firebase-client-app";
import {
  Auth,
  getAuth,
  signInAnonymously,
  signOut,
  UserCredential,
} from "firebase/auth";
import { singleton } from "tsyringe";

@singleton()
export class FirebaseAnonymousAuthProvider
  implements AnonymousAuthProviderContract<UserCredential>
{
  auth: Auth;

  constructor(clientApp: FirebaseClientApp) {
    this.auth = getAuth(clientApp.app);
  }
  signIn() {
    return signInAnonymously(this.auth);
  }

  signOut() {
    return signOut(this.auth);
  }

  get user(): any {
    return this.auth.currentUser;
  }
}
