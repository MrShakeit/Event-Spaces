import { UserDomain } from "./users";

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDomain;
}
