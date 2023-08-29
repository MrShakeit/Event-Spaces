import UsersDao from "./users.repository";
import { CRUD } from "../common/interfaces/crud.interface";
import argon2 from "argon2";
import { ObjectId, WithId } from "mongodb";
import {
  CreateUserDto,
  GetUsersDetails,
  PutUserDto,
  UserEntity,
} from "./users.types";
import usersRepository from "./users.repository";
class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    resource.password = await argon2.hash(resource.password);
    return UsersDao.addUser(resource);
  }

  async updateById(id: string, resource: PutUserDto): Promise<any> {
    resource.password = await argon2.hash(resource.password);
    return UsersDao.updateUserById(id, resource);
  }

  async updateUserBlockedStatus(
    id: string,
    isBlocked: boolean,
    blockReason?: string | null
  ): Promise<any> {
    return UsersDao.updateUserById(id, { isBlocked, blockReason });
  }

  async updateUserCityStatus(id: string, isCityMember: boolean): Promise<any> {
    return UsersDao.updateUserById(id, { isCityMember });
  }

  async deleteById(id: string): Promise<any> {
    return UsersDao.removeUserById(id);
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers(limit, page);
  }

  async getUserBy(query: Partial<WithId<UserEntity>>) {
    return UsersDao.getUserBy(query);
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }
  async readUserDetails(id: string): Promise<GetUsersDetails | null> {
    const userWithBookings = await UsersDao.getUserDetails(id);
    return userWithBookings;
  }
}

export default new UsersService();
