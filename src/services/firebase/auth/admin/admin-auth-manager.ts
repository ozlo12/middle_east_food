import { singleton } from "tsyringe";
import { Auth, getAuth } from "firebase-admin/auth";
import { FirebaseAdminApp } from "../../firebase-admin-app";
import { FirebaseAdminDB } from "../../frebase-admin-db";

@singleton()
export class FirebaseAdminAuthManager {
  _auth: Auth;
  constructor(
    private adminApp: FirebaseAdminApp,
    private adminDb: FirebaseAdminDB
  ) {
    this._auth = getAuth(this.adminApp.app);
  }

  private async _isAdmin(uid: string): Promise<boolean> {
    const adminRef = this.adminDb.db.ref("admins/" + uid);
    return new Promise<boolean>((res, rej) =>
      adminRef.once("value", (snapshot) => {
        return res(!!snapshot.val());
      })
    );
  }

  async authAdmin(uid: string): Promise<void> {
    const user = await this._auth.getUser(uid);
    if (!user) return;

    // Already admmin and has claims.
    if (user.customClaims?.["admin"]) {
      console.log("user already admin");
      return;
    }

    if (await this._isAdmin(uid)) {
      this._auth.setCustomUserClaims(uid, { admin: true });
      console.log(user.email, " will permote to be admin!");
    }
  }
}
