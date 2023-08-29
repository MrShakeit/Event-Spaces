export interface UserDomain {
  email: string;
  name: {
    first: string;
  };
}

export type CreateUserDto = {
  email: string;
  password: string;
  confirm_password: string; // Align with backend CreateUserDto
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
