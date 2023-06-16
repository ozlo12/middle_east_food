interface iModel<T = unknown> {
    validate(data?: T): boolean
}