import type { TRole } from "./global.interface";

export interface IAuthProvider {
  provider: 'google' | 'credentials'; // "Google", "Credential"
  providerId: string;
}


export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isBlock?: boolean;
  isVerified?: boolean;
  isDeleted?: boolean;
  role: TRole;
  auths: IAuthProvider[];
}
