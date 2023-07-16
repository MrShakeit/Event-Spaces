import debug from "debug";
import mongoService from "../common/services/mongo.service";
import { ObjectId } from "mongodb";
import { CreateUserDto, UserEntity, PutUserDto } from "./users.types";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  private users = mongoService.getDatabases().collection<UserEntity>("users");

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

  async removeUserById(userId: string) {
    return this.users.deleteOne({ _id: new ObjectId(userId) });
  }

  async updateUserById(userId: string, userFields: PutUserDto) {
    const existingUser = await this.users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: userFields }
    );
    return existingUser;
  }

  async getUsers(limit = 25, page = 0) {
    //@ts-ignore
    const users: Omit<UserEntity, "password">[] = await this.users
      .find()
      .project({ password: 0 })
      .skip(page * limit)
      .limit(limit)
      .toArray();
    return users;
  }

  async getUserByEmailWithPassword(email: string) {
    return this.users.findOne({ email: email });
  }

  async getUserBy(query: Partial<UserEntity>) {
    return this.users.findOne(query);
  }

  async getUserById(userId: string) {
    return this.users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
  }
}

export default new UsersDao();
