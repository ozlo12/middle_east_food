import { singleton } from "tsyringe";
import { FirebaseAuth } from "./firebase/auth/Auth";
import { FirebaseClientDB } from "./firebase/firebase-client-db";
import { AuthService } from "./auth/AuthService";

@singleton()
export class ContactService {
  constructor(
    private auth: FirebaseAuth,
    private authService: AuthService,
    private db: FirebaseClientDB
  ) {}
  private getUrl(uid: string) {
    return `/users/${uid}/contact/`;
  }
  private async getUser() {
    return (
      this.auth.user ||
      (await this.auth.isAuthenticated) ||
      (await this.authService.anonymousAuth.signIn()).user
    );
  }

  // async updateContact(contact: Contact) {
  //   const user = await this.auth.isAuthenticated;
  //   if (!user) throw new Error("No user singed in");
  //   const url = this.getUrl(user.uid);
  //   await this.db.updateData(url, contact);
  //   return contact;
  // }

  async getContact(): Promise<Contact | null> {
    const user = await this.auth.isAuthenticated;
    if (!user) return null;
    const url = this.getUrl(user.uid);
    const contact = (await this.db.getData(url)).val();
    return contact;
  }

  async setContact(contact: Contact) {
    const { uid } = await this.getUser();
    const url = this.getUrl(uid);
    await this.db.setData(url, contact);
    return contact;
  }

  // async createContact(data: Contact): Promise<Contact> {
  //   const { uid } = await this.getUser();
  //   const url = this.getUrl(uid);
  //   await this.db.setData(url, data);
  //   return data;
  // }
}
