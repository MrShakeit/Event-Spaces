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
}

export default new SpacesRepository();
