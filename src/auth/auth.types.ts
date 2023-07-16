export interface SignInDto {
  _id: string;
  email: string;
  permissionFlags: number;
}

export interface Jwt {
  user: SignInDto;
}

export enum PermissionFlag {
  GUEST_PERMISSION = 1,
  USER_PERMISSION = 2,
  ADMIN_PERMISSION = 4,
  MASTER_ADMIN_PERMISSION = 8,
  ALL_PERMISSIONS = 2147483647,
}
