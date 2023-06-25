import {
  Auth,
  onAuthStateChanged,
  signOut,
  Unsubscribe,
  User,
} from "firebase/auth";

export abstract class FirebaseAuth {
  protected _auth!: Auth;

  get user() {
    return this._auth.currentUser;
  }

  getUser() {
    return this._auth.currentUser;
  }

  signOut() {
    return signOut(this._auth);
  }

  authObserver(
    fn: (user: (User & { isAdmin?: boolean }) | null) => void
  ): Unsubscribe {
    return onAuthStateChanged(this._auth, async (user) => {
      //Check if user admin to add claims if not exist.
      let alteredUser: (User & { isAdmin?: boolean }) | null = null;
      if (user) {
        const res = await fetch("/api/auth/" + user?.uid);
        const resData: { admin: boolean } = await res.json();
        alteredUser = user;
        alteredUser.isAdmin = resData?.admin || false;
      }
      fn(alteredUser);
    });
  }
}
