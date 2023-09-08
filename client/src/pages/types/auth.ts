export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  permissionFlags: number;
}

export enum PermissionFlag {
  GUEST_PERMISSION = 1,
  USER_PERMISSION = 2,
  ADMIN_PERMISSION = 12,
  MASTER_ADMIN_PERMISSION = 8,
  ALL_PERMISSIONS = 2147483647,
}
