import { Booking } from "./bookings";
import { Space } from "./spaces";

export interface UserEntity {
  _id: string;
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
    prefix: string;
  };
  gender?: string;
  address?: {
    city: string;
    number: string;
    street: string;
    postalCode: string;
    subdivision?: string;
    barangay: string;
  };
  isBlocked: boolean;
  permissionFlags: number;
}

export type CreateUserDto = {
  email: string;
  password: string;
  confirm_password: string;
  name: {
    first: string;
    last: string;
    prefix: string;
  };
  gender?: string;
  address?: {
    city: string;
    number: string;
    street: string;
    postalCode: string;
    subdivision?: string;
    barangay: string;
  };
  // govIdPicture: string;
  // profilePicture?: string;
  // isCityMember: boolean;
  // isBlocked: boolean;
  // blockReason?: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};
export type GetUsersRequests = {
  limit: number;
  page: number;
};
export type GetUsersResponse = UserEntity[];

export type GetUsersDetails = {
  _id: string;
  email: string;
  name?: {
    first: string;
    last: string;
    prefix: string;
  };
  gender?: string;
  address?: {
    city: string;
    number: string;
    street: string;
    postalCode: string;
    subdivision: string;
    barangay: string;
  };
  isBlocked: boolean;
  permissionFlags: number;
  bookings: Booking[];
  space: Space[];
};
