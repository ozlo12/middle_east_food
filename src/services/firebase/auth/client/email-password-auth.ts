import type { EmailPasswordAuthContract } from "@/services/contracts/email-password-auth-contract";
import { FirebaseClientApp } from "@/services/firebase/firebase-client-app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { singleton } from "tsyringe";
import { FirebaseAuth } from "./auth";

@singleton()
export class FirebaseEmailPasswordAuth
  extends FirebaseAuth
  implements EmailPasswordAuthContract
{
  constructor(clientApp: FirebaseClientApp) {
    super();
    this._auth = getAuth(clientApp.app);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }
}
