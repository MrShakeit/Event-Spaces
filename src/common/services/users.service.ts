import UsersDao from "../../users/daos/users.dao";
import { CRUD } from "../interfaces/crud.interface";
import { CreateUserDto, UserEntity } from "../../users/dto/create.user.dto";
import { PutUserDto } from "../../users/dto/put.user.dto";
import { PatchUserDto } from "../../users/dto/patch.user.dto";
import argon2 from "argon2";
import { WithId } from "mongodb";
class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    resource.password = await argon2.hash(resource.password);
    return UsersDao.addUser(resource);
  }

  async deleteById(id: string): Promise<any> {
    return UsersDao.removeUserById(id);
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers(limit, page);
  }

  async patchById(id: string, resource: PatchUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async putById(id: string, resource: PutUserDto): Promise<any> {
    resource.password = await argon2.hash(resource.password);
    return UsersDao.updateUserById(id, resource);
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async getUserBy(query: Partial<WithId<UserEntity>>) {
    return UsersDao.getUserBy(query);
  }
  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }
}

export default new UsersService();
