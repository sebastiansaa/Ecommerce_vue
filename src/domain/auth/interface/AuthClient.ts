
export interface AuthClient {
  login(
    email: string,
    password: string): Promise<any>

  register(
    name: string,
    email: string,
    password: string): Promise<any>

  loginWithGoogle(
    token: string
  ): Promise<any>

  loginWithFacebook(
    token: string
  ): Promise<any>
}
