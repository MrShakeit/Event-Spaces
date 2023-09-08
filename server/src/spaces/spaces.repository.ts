import debug from "debug";
import mongoService from "../common/services/mongo.service";
import { Space } from "./spaces.types";
import { ObjectId } from "mongodb";

const log: debug.IDebugger = debug("app:in-memory-dao");

class SpacesRepository {
  private spaces = mongoService.getDatabases().collection<Space>("spaces");

  constructor() {
    log("Created new instance of SpacesRepository");
  }

  async addSpace(space: Space) {
    const new_space = await this.spaces.insertOne(space);
    return new_space.insertedId;
  }

  async removeSpaceById(id: string) {
    return this.spaces.deleteOne({ _id: new ObjectId(id) });
  }

  async updateSpaceById(id: string, updateQuery: Partial<Space>) {
    const updatedSpace = await this.spaces.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateQuery }
    );
    return updatedSpace;
  }

  async getSpaces(limit = 25, page = 0, query?: Partial<Space>) {
    return await this.spaces
      .find(query || {})
      .skip(page * limit)
      .limit(limit)
      .toArray();
  }

  async getSpaceBy(query: Partial<Space>) {
    return this.spaces.findOne(query);
  }

  async getSpaceById(id: string) {
    return this.spaces.findOne({ _id: new ObjectId(id) });
  }

  async getSpaceIdWithBookings(): Promise<ObjectId[]> {
    const bookingSpaces = await mongoService
      .getDatabases()
      .collection("bookings")
      .distinct("space_id");
    return bookingSpaces.map((id: string) => new ObjectId(id));
  }
  async getSpaceDetails(spaceId: string): Promise<any> {
    const pipeline = [
      {
        $match: { _id: new ObjectId(spaceId) },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "space_id",
          as: "bookings",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          address: {
            city: 1,
            number: 1,
            street: 1,
            floor: 1,
            room_no: 1,
            other: 1,
          },
          size: 1,
          price: 1,
          image: 1,
          images: 1,
          videos: 1,
          description: 1,
          is_deleted: 1,
          is_blocked: 1,
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
          from: "users",
          localField: "bookings.user_id",
          foreignField: "_id",
          as: "bookings.user",
        },
      },
      {
        $unwind: {
          path: "$bookings.user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          address: { $first: "$address" },
          size: { $first: "$size" },
          price: { $first: "$price" },
          image: { $first: "$image" },
          images: { $first: "$images" },
          videos: { $first: "$videos" },
          description: { $first: "$description" },
          is_deleted: { $first: "$is_deleted" },
          is_blocked: { $first: "$is_blocked" },
          bookings: { $push: "$bookings" },
        },
      },
    ];
    return this.spaces.aggregate(pipeline).next();
  }
}

export default new SpacesRepository();
