import { Cart } from "@/models/User";
import { User } from "firebase/auth";
import { singleton } from "tsyringe";
import { AuthService } from "./auth/AuthService";
import { FirebaseAuth } from "./firebase/auth/Auth";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { Unsubscribe } from "firebase/database";

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
    // Case no user yet and no items
    let authWatcher: () => void;
    let cartWatcher: Unsubscribe;

    authWatcher = this.auth.onAuthStateChanged((user) => {
      if (!user) return fn(new Cart());
      cartWatcher = this.db.watch(`/users/${user.uid}/cart`, (snap) => {
        fn(new Cart(snap.val()));
      });
    });
    return () => {
      if (cartWatcher) cartWatcher();
      if (authWatcher) authWatcher();
    };
  }

  async updateCart(cart: Cart) {
    const url = await this.getUrl();
    return this.db.updateData(url, cart);
  }
}
