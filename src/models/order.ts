import { Cart } from "./cart";


export enum OrderState { Pendeing, Successful, Canceled };

export class Order implements iModel {
    id!: string;
    constructor(
        public cart: Cart,
        public createdAt: Date,
        public state: OrderState = OrderState.Pendeing,
        public vat = 0.14
    ) {
    }

    get total(): number {
        const cartTotal = this.cart.totalPrice;
        return cartTotal + this.vat * cartTotal;
    }

    validate(): boolean {
        return this.cart.items.length > 0;
    }

}