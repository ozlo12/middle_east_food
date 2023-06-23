import { inject, singleton } from "tsyringe";
import type { EmailPasswordAuthContract } from "../contracts/EmailPasswordAuthContract";
@singleton()
export class AuthService {
  constructor(
    @inject("EmailPasswordAuthContract")
    public emailPasswordAuth: EmailPasswordAuthContract
  ) {}
}
