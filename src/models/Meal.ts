

export class Meal   {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public categories: string[],
        public image: string,
        public price: number,
        public createdAt: string,
    ) { }
}


