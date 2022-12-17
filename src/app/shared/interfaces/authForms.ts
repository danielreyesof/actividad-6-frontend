export interface TypeForm {
  id: string;
  label: string;
}

export interface UserInfo {
  status: number;
  message: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  status: number;
  date_create: number;
  date_update: number;
  date_delete: null;
}

export interface AuthResponse {
  status: number;
  token: string;
}

export interface SignUpUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

