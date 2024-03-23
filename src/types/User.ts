export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  authToken?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserLoginRequest {
    username: string;
    password: string;
}