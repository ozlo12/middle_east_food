import { UserCredential } from "firebase/auth";
import { inject, singleton } from "tsyringe";

@singleton()
export class AnonymousAuthService {
  constructor(
    @inject("AnonymousAuthProvider")
    private anonymouseAuthProvider: AnonymousAuthProvider<UserCredential>
  ) {}

  signIn() {
    return this.anonymouseAuthProvider.signIn();
  }
}
