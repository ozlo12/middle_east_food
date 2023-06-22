import { Auth, getAuth } from "firebase-admin/auth";
import { singleton } from "tsyringe";
import { FirebaseAdminApp } from "../../firebase-admin-app";
import { FirebaseAdminDB } from "../../frebase-admin-db";

@singleton()
export class FrebaseAdminAuthManager {
  _auth: Auth;
  constructor(
    private adminApp: FirebaseAdminApp,
    private adminDb: FirebaseAdminDB
  ) {
    this._auth = getAuth(adminApp.app);
  }

  async isAdmin(uid: string): Promise<boolean> {
    const user = await this._auth.getUser(uid);
    if (user.customClaims?.["admin"]) {
      // Already admmin and has claims.
      console.log("user already admin");
      return true;
    }

    const adminRef = this.adminDb.db.ref("admins/" + uid);
    const isAdmin = await new Promise<boolean>((res, rej) =>
      adminRef.once("value", (sanpshot) => {
        if (sanpshot.val()) {
          console.log(user.email + " will be promoted to admiin");
          console.log(sanpshot.val());
          this._auth.setCustomUserClaims(uid, { admin: true });
          return res(true);
        } else return res(false);
      })
    );
    return isAdmin;
  }
}
