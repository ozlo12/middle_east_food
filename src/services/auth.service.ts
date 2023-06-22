import { inject, singleton } from "tsyringe";
import type { EmailPasswordAuthContract } from "./contracts/email-password-auth-contract";
@singleton()
export class AuthService {
  constructor(
    @inject("EmailPasswordAuthContract")
    public emailPasswordAuth: EmailPasswordAuthContract
  ) {}
}
