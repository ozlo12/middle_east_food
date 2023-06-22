import { Container } from "./Container";
import { FirebaseEmailPasswordAuth } from "@/services/firebase/auth/client/email-password-auth";
const ClientContainer = Container.createChildContainer();

ClientContainer.register("EmailPasswordAuthContract", {
  useClass: FirebaseEmailPasswordAuth,
});

export { ClientContainer };
