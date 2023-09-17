import {
  Booking,
  BookingEntity,
  GetBookingsRequests,
  GetBookingsResponse,
} from "../pages/types/bookings";
import {
  CreateSpace,
  GetSpacesRequests,
  GetSpacesResponse,
  GetsSpaceDetails,
} from "../pages/types/spaces";
import {
  GetUsersDetails,
  GetUsersRequests,
  GetUsersResponse,
} from "../pages/types/users";
import { AbstractApiService } from "./abstract-api-client";

export class AdminApi extends AbstractApiService {
  constructor() {
    super("/admin");
  }
  async getUsers(params: GetUsersRequests): Promise<GetUsersResponse> {
    const res = await this.http.get("users", {
      params,
    });

    return res.data;
  }
  async getUsersDetails(userId: string): Promise<GetUsersDetails> {
    const res = await this.http.get(`user/details/${userId}`);
    return res.data;
  }
  async getSpaces(params: GetSpacesRequests): Promise<GetSpacesResponse> {
    const res = await this.http.get("spaces", {
      params,
    });
    return res.data;
  }
  async getSpaceDetails(spaceId: string): Promise<GetsSpaceDetails> {
    const res = await this.http.get(`space/details/${spaceId}`);
    return res.data;
  }
  async createSpace(space: CreateSpace): Promise<{ id: string }> {
    const res = await this.http.post("create/space", space);
    return res.data;
  }
  async updateSpace(
    spaceId: string,
    updatedSpaceData: CreateSpace
  ): Promise<CreateSpace> {
    const res = await this.http.put(
      `update/space/${spaceId}`,
      updatedSpaceData
    );
    return res.data;
  }
  async getBookings(params: GetBookingsRequests): Promise<GetBookingsResponse> {
    const res = await this.http.get("bookings", {
      params,
    });
    return res.data;
  }
  async getBookingDetails(bookingId: string): Promise<Booking> {
    const res = await this.http.get(`booking/details/${bookingId}`);
    return res.data;
  }
  async updateBooking(
    bookingId: string,
    updatedBookingData: BookingEntity
  ): Promise<BookingEntity> {
    const res = await this.http.put(
      `update/booking/${bookingId}`,
      updatedBookingData
    );
    return res.data;
  }
}
export const adminApi = new AdminApi();
