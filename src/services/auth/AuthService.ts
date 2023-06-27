import { singleton } from "tsyringe";
import { AnonymousAuthService } from "./AnonymousAuth";
import { EmailPasswordAuthService } from "./EmailPasswordAuth";

@singleton()
export class AuthService {
  constructor(
    public emailAuth: EmailPasswordAuthService,
    public anonymousAuth: AnonymousAuthService
  ) {}
}
