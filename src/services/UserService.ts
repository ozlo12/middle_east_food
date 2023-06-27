import { Cart, ContactInfo, User, UserDoc } from "@/models/User";
import { singleton } from "tsyringe";
import { CartService } from "./CartService";

@singleton()
export class UserService {
  constructor(public userModel: User, public cartService: CartService) {}

  async getUser(id: string) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (err) {
      return this.createUser(id);
    }
  }

  createUser(id: string, restData?: Partial<UserDoc>) {
    return this.userModel.create({
      id,
      orders: [],
      cart: new Cart(),
      ...restData,
    });
  }

  updateContact(uid: string, contactInfo: ContactInfo) {
    return this.userModel.updateById(uid, { contactInfo });
  }
}
