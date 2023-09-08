import { Booking } from "./bookings";
import { UserEntity } from "./users";

export interface Space {
  _id: string;
  name: string;
  address: {
    city: string;
    street: string;
    number: string;
    floor: number;
    room_no: number;
    other?: string;
  };
  size: string;
  price: number;
  resident_price: number;
  image: string;
  images: string[];
  videos: string[];
  description?: string;
  is_deleted: boolean;
  is_blocked: boolean;
  bookings: Booking[];
  user: UserEntity[];
}
export interface CreateSpace {
  name: string;
  address: {
    city: string;
    street: string;
    number: string;
    floor: number;
    room_no: number;
    other?: string;
  };
  size: string;
  price: number;
  resident_price: number;
  image: string;
  images: string[];
  videos: string[];
  description?: string;
  is_deleted: boolean;
  is_blocked: boolean;
}

export type GetSpacesRequests = {
  limit: number;
  page: number;
};
export type GetSpacesResponse = Space[];

export type GetsSpaceDetails = {
  _id: string;
  name: string;
  address: {
    barangay: string;
    city: string;
    street: string;
    number: string;
    floor: number;
    room_no: number;
    other?: string;
  };
  size: string;
  price: number;
  resident_price: number;
  image: string;
  images: string[];
  videos: string[];
  description?: string;
  is_deleted: boolean;
  is_blocked: boolean;
  bookings: Booking[];
  user: UserEntity[];
};
