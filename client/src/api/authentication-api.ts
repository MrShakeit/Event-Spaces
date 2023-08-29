import { SignInResponse } from "../pages/types/auth";
import { CreateUserDto, UserCredentials } from "../pages/types/users";
import { AbstractApiService } from "./abstract-api-client";

export class AuthenticationApi extends AbstractApiService {
  constructor() {
    super("/auth");
  }

  async signUp(user: CreateUserDto): Promise<void> {
    const response = await this.http.post("signup", user);
    return response.data;
  }

  async signIn(credentials: UserCredentials): Promise<SignInResponse> {
    const res = await this.http.post("signin", credentials);
    return res.data;
  }

  async refreshToken(refreshToken: string): Promise<SignInResponse> {
    const res = await this.http.post("refresh-token", { refreshToken });
    return res.data;
  }
}

export const authenticationApi = new AuthenticationApi();
