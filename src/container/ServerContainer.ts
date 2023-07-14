import "reflect-metadata";
import { FirebaseAdminApp } from "@/services/firebase/firebase-admin-app";
import { FirebaseAdminDB } from "@/services/firebase/firebase-admin-db";
import { container } from "tsyringe";

const ServerContainer = container.createChildContainer();

export const adminApp = ServerContainer.resolve(FirebaseAdminApp);
export const adminDb = ServerContainer.resolve(FirebaseAdminDB);
