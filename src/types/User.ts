export interface User {
  id: number;
  name: string;
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