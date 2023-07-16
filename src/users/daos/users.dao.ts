import debug from "debug";
import mongooseService from "../../common/services/mongoose.service";
import { ObjectId } from "mongodb";

import { CreateUserDto, UserEntity, UsersList } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { Document, WithId } from "mongodb";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  private users = mongooseService
    .getDatabases()
    .collection<UserEntity>("users");

  constructor() {
    log("Created new instance of UsersDao");
  }

  async addUser(userFields: CreateUserDto) {
    const user = await this.users.insertOne({
      ...userFields,
      permissionFlags: 1,
    });
    return user.insertedId;
  }

  //async getUserByEmailWithPassword(email: string) {
  // return this.User.findOne({ email: email })
  //   .select("_id email permissionFlags +password")
  //   .exec();
  //}
  async getUserByEmailWithPassword(email: string) {
    return this.users.findOne(
      { email: email },
      { projection: { _id: 1, email: 1, permissionFlags: 1, password: 1 } }
    );
  }

  async getUserBy(query: Partial<UserEntity>) {
    // return this.User.findOne(query).exec();
  }

  async getUserById(userId: string) {
    return this.users.findOne({ _id: new ObjectId(userId) });
  }

  async getUsers(limit = 25, page = 0) {
    try {
      //@ts-ignore
      const users: Omit<UserEntity, "password">[] = await this.users
        .find()
        .project({ password: 0 })
        .skip(page * limit)
        .limit(limit)
        .toArray();
      return users;
    } catch (error) {
      //@ts-ignore
      console.log("ERROR: ", error.message as string);
      return [];
    }
  }

  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    //   const existingUser = await this.User.updateOne(
    //     { _id: userId },
    //     { $set: userFields }
    //   ).exec();
    //   return existingUser;
  }

  // async removeUserById(userId: string) {
  //   // return this.User.deleteOne({ _id: userId }).exec();
  // }
  async removeUserById(userId: string) {
    return this.users.deleteOne({ _id: new ObjectId(userId) });
  }
}

export default new UsersDao();
