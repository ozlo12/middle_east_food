import { FirebaseAdminAuthManager } from "@/services/firebase/auth/admin/admin-auth-manager";
import { singleton } from "tsyringe";

@singleton()
export class AdminModule {
  constructor(public authManager: FirebaseAdminAuthManager) {}
}
