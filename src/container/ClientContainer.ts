import "reflect-metadata";
import { container } from "tsyringe";
import { Meal } from "@/models/Meal";
import { FirebaseEmailAuthProvider } from "@/services/firebase/auth/EmailAuthProvider";
import { FirebaseAnonymousAuthProvider } from "@/services/firebase/auth/AnonymousAuthProvider";
import { AuthService } from "@/new-services/auth/AuthService";
import { FirebaseAuth } from "@/services/firebase/auth/Auth";
const ClientContainer = container.createChildContainer();

ClientContainer.register("EmailAuthProvider", {
  useClass: FirebaseEmailAuthProvider,
});

ClientContainer.register("AnonymousAuthProvider", {
  useClass: FirebaseAnonymousAuthProvider,
});

export const authService = ClientContainer.resolve(AuthService);
export const firebaseAuth = ClientContainer.resolve(FirebaseAuth);

// Repos
export const mealModel = ClientContainer.resolve(Meal);
