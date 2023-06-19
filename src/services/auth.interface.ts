import { User, UserCredential } from "firebase/auth";

export interface AuthContract {
  singup(email: string, password: string): Promise<UserCredential>;
  login(email: string, password: string): Promise<UserCredential>;
  isAuthenticated(): User | null;
}
