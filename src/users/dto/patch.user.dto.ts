import { PutUserDto } from "./put.user.dto";

export interface PatchUserDto extends Partial<PutUserDto> {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionFlags?: number;
}
