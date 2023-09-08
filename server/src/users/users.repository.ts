import debug from "debug";
import mongoService from "../common/services/mongo.service";
import { ObjectId } from "mongodb";
import {
  CreateUserDto,
  UserEntity,
  PutUserDto,
  GetUsersDetails,
} from "./users.types";

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
      isBlocked: false,
      isCityMember: false,
    });
    return user.insertedId;
  }

  async removeUserById(userId: string) {
    return this.users.deleteOne({ _id: new ObjectId(userId) });
  }

  async updateUserById(userId: string, userFields: Partial<PutUserDto>) {
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
  async getUserDetails(userId: string): Promise<GetUsersDetails> {
    const pipeline = [
      {
        $match: { _id: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "user_id",
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          name: {
            first: 1,
            last: 1,
            prefix: 1,
          },
          gender: 1,
          address: {
            city: 1,
            number: 1,
            street: 1,
            postalCode: 1,
            subdivision: 1,
            barangay: 1,
          },
          isBlocked: 1,
          permissionFlags: 1,
          bookings: {
            $cond: {
              if: { $isArray: "$bookings" },
              then: "$bookings",
              else: [],
            },
          },
        },
      },
      {
        $unwind: {
          path: "$bookings",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "spaces",
          localField: "bookings.space_id",
          foreignField: "_id",
          as: "bookings.space",
        },
      },
      {
        $unwind: {
          path: "$bookings.space",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          email: { $first: "$email" },
          name: { $first: "$name" },
          gender: { $first: "$gender" },
          address: { $first: "$address" },
          isBlocked: { $first: "$isBlocked" },
          permissionFlags: { $first: "$permissionFlags" },
          bookings: { $push: "$bookings" },
        },
      },
    ];
    console.log(pipeline);
    //@ts-ignore
    return this.users.aggregate(pipeline).next();
  }
}

export default new UsersDao();
