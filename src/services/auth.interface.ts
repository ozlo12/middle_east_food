import { User, UserCredential } from "firebase/auth";

export interface AuthContract {
  signup(email: string, password: string): Promise<UserCredential>;
  login(email: string, password: string): Promise<UserCredential>;
  isAuthenticated(): User | null;
}
