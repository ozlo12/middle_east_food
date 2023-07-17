import "reflect-metadata";
import { container } from "tsyringe";
// import { Meal } from "@/models/Meal";
import { FirebaseEmailAuthProvider } from "@/services/firebase/auth/EmailAuthProvider";
import { FirebaseAnonymousAuthProvider } from "@/services/firebase/auth/AnonymousAuthProvider";
import { AuthService } from "@/services/auth/AuthService";
import { FirebaseAuth } from "@/services/firebase/auth/Auth";
import { UserService } from "@/services/UserService";
import { CartService } from "@/services/CartService";
import { ContactService } from "@/services/ContactService";
import { OrderService } from "@/services/OrderService";
import { MealService } from "@/services/MealService";
import { FirebaseClientDB } from "@/services/firebase/firebase-client-db";
import { MailService } from "@/services/MailService";
const ClientContainer = container.createChildContainer();

ClientContainer.register("EmailAuthProvider", {
  useClass: FirebaseEmailAuthProvider,
});

ClientContainer.register("AnonymousAuthProvider", {
  useClass: FirebaseAnonymousAuthProvider,
});

// Auth
export const authService = ClientContainer.resolve(AuthService);
export const firebaseAuth = ClientContainer.resolve(FirebaseAuth);

// Repos
// export const mealModel = ClientContainer.resolve(Meal);

// Services
export const mailService = ClientContainer.resolve(MailService);

export const clientDB = ClientContainer.resolve(FirebaseClientDB);
export const userService = ClientContainer.resolve(UserService);
export const cartService = ClientContainer.resolve(CartService);
export const contactService = ClientContainer.resolve(ContactService);
export const orderService = ClientContainer.resolve(OrderService);
export const mealService = ClientContainer.resolve(MealService);
