import "reflect-metadata";
import { FirebaseAdminApp } from "@/services/firebase/firebase-admin-app";
import { FirebaseAdminDB } from "@/services/firebase/firebase-admin-db";
import { container } from "tsyringe";
import { MealAdminService } from "@/services/MealAdminService";
import { MailServerService } from "@/services/MailServerService";

const ServerContainer = container.createChildContainer();

// Services
export const mealServices = ServerContainer.resolve(MealAdminService);

export const mailServerService = ServerContainer.resolve(MailServerService);

export const adminApp = ServerContainer.resolve(FirebaseAdminApp);

export const adminDb = ServerContainer.resolve(FirebaseAdminDB);
