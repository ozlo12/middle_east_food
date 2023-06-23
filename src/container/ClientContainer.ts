import "reflect-metadata";
import { container } from "tsyringe";
import { FirebaseEmailPasswordAuth } from "@/services/firebase/auth/client/email-password-auth";
import { AuthModule } from "@/modules/AuthModule";
const ClientContainer = container.createChildContainer();

ClientContainer.register("EmailPasswordAuthContract", {
  useClass: FirebaseEmailPasswordAuth,
});

export const authModule = ClientContainer.resolve(AuthModule);
// export { ClientContainer };
