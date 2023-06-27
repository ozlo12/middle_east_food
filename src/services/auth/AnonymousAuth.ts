import type { AnonymousAuthProviderContract } from "@/contracts/AuthProviderContract";
import { UserCredential } from "firebase/auth";
import { inject, singleton } from "tsyringe";

@singleton()
export class AnonymousAuthService {
  constructor(
    @inject("AnonymousAuthProvider")
    private anonymouseAuthProvider: AnonymousAuthProviderContract<UserCredential>
  ) {}

  signIn() {
    return this.anonymouseAuthProvider.signIn();
  }
}
