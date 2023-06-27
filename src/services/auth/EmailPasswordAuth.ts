import type { EmailAuthProviderContract } from "@/contracts/AuthProviderContract";
import { UserCredential } from "firebase/auth";
import { inject, singleton } from "tsyringe";

@singleton()
export class EmailPasswordAuthService {
  constructor(
    @inject("EmailAuthProvider")
    private emailAuthProvider: EmailAuthProviderContract<UserCredential>
  ) {}
  signIn(email: string, password: string): Promise<UserCredential> {
    return this.emailAuthProvider.signIn(email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return this.emailAuthProvider.signUp(email, password);
  }
}
