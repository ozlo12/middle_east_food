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

  authObserver(fn: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(this._auth, async (user) => {
      //Check if user admin to add claims if not exist.
      if (user) {
        const res = await fetch("/api/auth/" + user?.uid);
        const resData = await res.json();
        console.log(resData);
      }
      fn(user);
    });
  }
}
