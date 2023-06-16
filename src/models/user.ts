import { Cart } from "./cart";
import { Order } from "./order";

export class User implements iModel {
    constructor(
        public id: string,
        public name: string,
        public address: string,
        public phone: string,
        public cart: Cart,
        public orders: Order[]
    ) {
    }

    validate(): boolean {
        throw new Error('not implemented yet')
    }
}