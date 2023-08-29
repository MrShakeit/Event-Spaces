import debug from "debug";
import mongoService from "../common/services/mongo.service";
import { Booking } from "./bookings.types";
import { ObjectId } from "mongodb";
import { CustomError } from "../common/middleware/common.error";

const log: debug.IDebugger = debug("app:in-memory-dao");

class BookingsRepository {
  private booking = mongoService.getDatabases().collection<Booking>("bookings");

  constructor() {
    log("Created new instance of BookingsRepository");
  }

  async addBooking(booking: Booking) {
    const new_booking = await this.booking.insertOne({
      ...booking,
      space_id: new ObjectId(booking.space_id),
      user_id: new ObjectId(booking.user_id),
    });
    return new_booking.insertedId;
  }
  async findOverlappingBooking(booking: Booking) {
    const overlappingBooking = await this.booking.findOne({
      space_id: booking.space_id,
      $or: [
        {
          start_date: { $lt: booking.end_date },
          end_date: { $gt: booking.start_date },
        },
        {
          start_date: { $eq: booking.start_date },
          end_date: { $ne: booking.end_date },
        },
        {
          start_date: { $ne: booking.start_date },
          end_date: { $eq: booking.end_date },
        },
        {
          start_date: { $eq: booking.start_date },
          end_date: { $eq: booking.end_date },
        },
      ],
    });

    return overlappingBooking;
  }

  async removeBookingById(id: string) {
    return this.booking.deleteOne({ _id: new ObjectId(id) });
  }

  async updateBookingById(id: string, updateQuery: Partial<Booking>) {
    const updatedBooking = await this.booking.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateQuery }
    );
    return updatedBooking;
  }

  async getBookings(limit = 25, page = 0, query?: Partial<Booking>) {
    return await this.booking
      .find(query || {})
      .skip(page * limit)
      .limit(limit)
      .toArray();
  }

  async getUserBookings(userId: string, limit: number, page: number) {
    return (
      this.booking
        //@ts-ignore
        .find({ user_id: userId })
        .skip(page * limit)
        .limit(limit)
        .toArray()
    );
  }

  async getBookingBy(query: Partial<Booking>) {
    return this.booking.findOne(query);
  }

  async getBookingsWithinDateRange(filter: any) {
    console.log("FILTER", filter);
    const { start_date, end_date, space_id } = filter;
    const query = {
      start_date: { $gte: new Date(start_date) },
      end_date: { $lte: new Date(end_date) },
      space_id: new ObjectId(space_id),
      is_canceled: false,
      is_deleted: false,
    };
    const aggregationPipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "spaces",
          localField: "space_id",
          foreignField: "_id",
          as: "space",
        },
      },
      {
        $unwind: "$space",
      },
    ];
    return this.booking.aggregate(aggregationPipeline).toArray();
  }

  async getBookingById(id: string) {
    return this.booking.findOne({ _id: new ObjectId(id) });
  }
}

export default new BookingsRepository();
