import { WithId } from "mongodb";

export interface CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionFlags?: number;
}

export interface UserEntity {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionFlags?: number;
}

export type UsersList = Array<Omit<WithId<UserEntity>, "password">>;

export interface GetUsersDto {
  limit: number;
  page: number;
}
