import type { EmailPasswordAuthContract } from "@/services/contracts/email-password-auth-contract";
import { inject, singleton } from "tsyringe";

@singleton()
export class AuthModule {
  constructor(
    @inject("EmailPasswordAuthContract")
    public emailPasswordAuth: EmailPasswordAuthContract
  ) {}
}
