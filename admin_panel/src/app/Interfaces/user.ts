import { IBase } from './base';

export interface IUser extends IBase {
  userName: string;
  firstName?: string;
  lastName?: string;
  role: IRole;
  resetPin?: string;
  email: string;
  changeEmail: string;
  mobile?: number;
  mobileCode?: number;
  countryCode?: string;
  countryName?: string;
  city?: string;
  state?: string;
  location?: string;
  pinCode?: number;
  gender?: string;
  dob?: string;
  rememberToken?: string;
  verificationToken?: string;
  verificationTokenExpireAt?: string;
  isEmailVerifiedisMobileNumberVerified: boolean;
  isMobileNumberVerified: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  password: string;
  status: string;
  lastLoginAt?: Date;
}

export enum IRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER ADMIN',
}
