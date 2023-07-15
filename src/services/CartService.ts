import { User } from "firebase/auth";
import { singleton } from "tsyringe";
import { AuthService } from "./auth/AuthService";
import { FirebaseAuth } from "./firebase/auth/Auth";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { Unsubscribe as DataUnsubscribe } from "firebase/database";
import { Unsubscribe as AuthUnsubscribe } from "firebase/auth";

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
    const cart: Cart = { items: [], totalPrice: 0 };

    await this.db.setData(url, cart);
    return cart;
  }

  async watchCart(fn: (cart: Cart) => void): Promise<() => void> {
    // Case no user yet and no items
    let authWatcher: AuthUnsubscribe;
    let cartWatcher: DataUnsubscribe;

    let dummyCart: Cart = { items: [], totalPrice: 0 };

    authWatcher = this.auth.onAuthStateChanged((user) => {
      if (!user) return fn(dummyCart);

      cartWatcher = this.db.watch(`/users/${user.uid}/cart`, (snap) => {
        const cart = snap.val();
        fn({ items: cart.items || [], totalPrice: cart.totalPrice });
      });
    });

    return () => {
      if (cartWatcher) cartWatcher();
      if (authWatcher) authWatcher();
    };
  }

  private async updateCart(cart: Cart) {
    const url = await this.getUrl();
    return this.db.updateData(url, cart);
  }

  private findItem(cart: Cart, meal: Meal) {
    return cart.items.find((i) => i.item.id === meal.id);
  }

  resetCart() {
    const cart: Cart = { items: [], totalPrice: 0 };
    return this.updateCart(cart);
  }

  addToCart(cart: Cart, meal: Meal) {
    const cartItem = this.findItem(cart, meal);

    if (cartItem) {
      ++cartItem.quantity;
      cart.totalPrice = +(cart.totalPrice + meal.price).toFixed(2);
    } else {
      cart.items.push({ item: meal, quantity: 1 });
    }
    return this.updateCart(cart);
  }

  removeFromCart(cart: Cart, meal: Meal) {
    const cartItem = this.findItem(cart, meal);
    if (!cartItem) throw new Error("Try to remove not existing item from cart");

    if (cartItem.quantity > 1) --cartItem.quantity;
    else cart.items = cart.items.filter((i) => i.item.id !== meal.id);

    cart.totalPrice = cart.items.reduce(
      (prev, { item, quantity }) => +(item.price * quantity).toFixed(2) + prev,
      0
    );

    return this.updateCart(cart);
  }
}
