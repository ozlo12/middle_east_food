import { singleton } from "tsyringe";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { FirebaseAppService } from "./firebase-config.service";
import { AuthProvider } from "./auth-provider.interface";

@singleton()
export class LocalAuthProviderService implements AuthProvider {
  private auth: Auth;
  constructor(firebaseApp: FirebaseAppService) {
    this.auth = getAuth();
    connectAuthEmulator(this.auth, "http://localhost:9099");
  }

  getAuth() {
    return this.auth;
  }
}

@singleton()
export class AuthProviderService implements AuthProvider {
  private auth: Auth;
  constructor(firebaseApp: FirebaseAppService) {
    this.auth = getAuth(firebaseApp.app);
  }

  getAuth() {
    return this.auth;
  }
}
