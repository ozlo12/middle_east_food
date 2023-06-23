export interface EmailPasswordAuthContract {
  signUp(email: string, password: string): any;
  signIn(email: string, password: string): any;
  signOut(): any;
  getUser(): any;
  authObserver(fn: (user: any | null) => void): () => void;
}
