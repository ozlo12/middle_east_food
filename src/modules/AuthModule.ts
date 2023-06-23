import type { EmailPasswordAuthContract } from "@/contracts/EmailPasswordAuthContract";
import { inject, singleton } from "tsyringe";

@singleton()
export class AuthModule {
  constructor(
    @inject("EmailPasswordAuthContract")
    public emailPasswordAuth: EmailPasswordAuthContract
  ) {}
}
