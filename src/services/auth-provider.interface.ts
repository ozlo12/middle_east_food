import { Auth } from "firebase/auth";

export interface AuthProvider {
  getAuth(): Auth;
}
