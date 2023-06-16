interface iDataProvider<T> {
    insert(data: T): Promise<T>;
    getAll(): Promise<T[]>;
    updateById(id: any, data: Partial<T>): Promise<T>;
    findOne(id: any): Promise<T>;
    delete(id: any): Promise<void>;
}