import { Meal } from "./meal";


export class CartItem implements iModel {
    quantity = 1;
    constructor(public meal: Meal) { }

    get cost() {
        return this.meal.price * this.quantity;
    }

    increment(): number {
        return ++this.quantity;
    }
    decrement(): number {
        return --this.quantity;
    }

    validate(data: this = this): boolean {
        return data.quantity > 0 && data.meal.validate();
    }
}

export class Cart implements iModel {
    constructor(
        public uid: string,
        public items: CartItem[] = [],
    ) { }

    get totalItems(): number {
        return this.items.reduce((acc, { quantity }) => quantity + acc, 0)
    }

    get totalPrice(): number {
        return this.items.reduce((acc, item) => acc + item.cost, 0);
    }

    private _getItem(mealId?: string) {
        return this.items.find((i) => i.meal.id === mealId);
    }

    addItem(meal: Meal) {
        const item = this._getItem(meal.id);
        if (item) item.increment();
        else this.items.push(new CartItem(meal));
    }

    removeItem(mealId: string) {
        const item = this._getItem(mealId);
        if (item && item.quantity > 1) item.decrement();
        else if (item) this.items.filter(i => i.meal.id !== mealId);
    }

    validate({ items }: this = this): boolean {
        return !items.some(item => !item.validate());
    }

}
