//user details /users/details/:id
//list users /admin/listUsers
//remove user / getuserbyid / update user /users/:id

//block user /users/block/:id
//unblock user /users/unblock/:id
//update user city status /users/addCityMember/:id
//remove user ity status /users/removeCityMember/:id

//spaces
//createspace /spaces
//space details /spaces/details/:id
//remove space/update space /spaces/:id

//bookings
//list admin bookings /bookings
//remove/update booking /bookings/:id

export interface Booking {
  start_date: Date;
  end_date: Date;
  is_approved: boolean;
  is_canceled: boolean;
  is_deleted: boolean;
  is_paid: boolean;
  paid: number;
  reason: string;
  penalty_info: string;
}
export interface Space {
  name: string;
  address: {
    city: string;
    street: string;
    number: number;
    floor: number;
    room_no: number;
    other?: string;
  };
  size: string;
  price: number;
  image: string;
  images: string[];
  videos: string[];
  description?: string;
  is_deleted: boolean;
  is_blocked: boolean;
}

export interface User {
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
}
