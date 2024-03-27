export interface User {
  id: number;
  accountName: string;
  email: string;
  role: UserRole;
  token: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PUBLIC = 'PUBLIC',
}

export interface UserLoginRequest {
    username: string;
    password: string;
}