import { Cart } from "@/models/User";
import { User } from "firebase/auth";
import { singleton } from "tsyringe";
import { AuthService } from "./auth/AuthService";
import { FirebaseAuth } from "./firebase/auth/Auth";
import { FirebaseClientDB } from "./firebase/firebase-client-db";

@singleton()
export class CartService {
  constructor(
    private db: FirebaseClientDB,
    private auth: FirebaseAuth,
    private authService: AuthService
  ) {}

  async getCurrentUser(): Promise<User> {
    try {
      return (
        this.auth.user ||
        (await this.auth.isAuthenticated) ||
        (await this.authService.anonymousAuth.signIn()).user
      );
    } catch (err) {
      console.log(err instanceof Error ? err.message : err);
      throw new Error("User not signed in");
    }
  }

  async getUrl() {
    const { uid } = await this.getCurrentUser();
    return `/users/${uid}/cart`;
  }

  async createCart(): Promise<Cart> {
    const url = await this.getUrl();
    const { uid } = await this.getCurrentUser();
    await this.db.setData(url, new Cart());
    return new Cart();
  }

  async watchCart(fn: (cart: Cart) => void): Promise<() => void> {
    const url = await this.getUrl();
    return this.db.watch(url, async (snap) => {
      if (snap.exists()) fn(new Cart(snap.val()));
      else fn(await this.createCart());
    });
  }

  async updateCart(cart: Cart) {
    const url = await this.getUrl();
    return this.db.updateData(url, cart);
  }
}
