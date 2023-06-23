import "reflect-metadata";
import { container } from "tsyringe";
import { FirebaseEmailPasswordAuth } from "@/services/firebase/auth/client/email-password-auth";
import { AuthModule } from "@/modules/AuthModule";
import { Meal } from "@/models/Meal";
const ClientContainer = container.createChildContainer();
// Auth
ClientContainer.register("EmailPasswordAuthContract", {
  useClass: FirebaseEmailPasswordAuth,
});
export const authModule = ClientContainer.resolve(AuthModule);

// Repos
export const mealModel = ClientContainer.resolve(Meal);
