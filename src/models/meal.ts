
export enum Category {
    Vegan, Vegetarian, Syrian
}

export class Meal implements iModel {
    constructor(
        public name: string,
        public description: string,
        public category: Category,
        public image: string,
        public price: number,
        public createdAt: Date,
        public id?: string,
    ) { }

    validate() {
        return this.price > -1;
    }
}


