export interface EmailAuthProviderContract<T = any> {
  signIn(email: string, password: string): Promise<T>;
  signUp(email: string, password: string): Promise<T>;
}

export interface AnonymousAuthProviderContract<T = any> {
  signIn(): Promise<T>;
}
