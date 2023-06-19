import { initializeApp } from "firebase/app";
import { inject, singleton } from "tsyringe";
import { AuthContract } from "./auth.interface";
import { AuthProviderService } from "./auth-provider.service";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import type { AuthProvider } from "./auth-provider.interface";

@singleton()
export class AuthEmailService implements AuthContract {
  constructor(@inject("AuthProvider") private authProvider: AuthProvider) {}

  async signup(email: string, password: string): Promise<any> {
    return await createUserWithEmailAndPassword(
      this.authProvider.getAuth(),
      email,
      password
    );
  }
  async login(email: string, password: string): Promise<any> {
    return await signInWithEmailAndPassword(
      this.authProvider.getAuth(),
      email,
      password
    );
  }

  isAuthenticated() {
    const user = this.authProvider.getAuth().currentUser;
    return user;
  }

  regsterAuthObserver(fun: (user: User | null) => void) {
    return this.authProvider.getAuth().onAuthStateChanged(fun);
  }

  signOut() {
    return this.authProvider.getAuth().signOut();
  }
}
