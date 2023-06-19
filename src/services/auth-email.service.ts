import { initializeApp } from "firebase/app";
import { inject, singleton } from "tsyringe";
import { AuthContract } from "./auth.interface";
import { AuthProviderService } from "./auth-provider.service";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { AuthProvider } from "./auth-provider.interface";

@singleton()
export class AuthEmailService implements AuthContract {
  constructor(@inject("AuthProvider") private authProvider: AuthProvider) {}

  async singup(email: string, password: string): Promise<any> {
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
}
