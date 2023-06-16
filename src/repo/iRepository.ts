
interface iRepository<Model> {
    create(data: Model): Promise<Model>;
    all(): Promise<Model[]>;
    update(data: Partial<Model>): Promise<Model>;
    findOne(id: string): Promise<Model>;
    delete(id: string): Promise<void>;
}