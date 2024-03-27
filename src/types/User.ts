export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  token: string;
  createdDate: string;
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