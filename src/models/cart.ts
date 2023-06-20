export class CartItem<T> {
  constructor(public item: T, public quantity: number) {}
}

export class Cart<T> {
  constructor(public items: CartItem<T>[], public totalPrice: number) {}
}
