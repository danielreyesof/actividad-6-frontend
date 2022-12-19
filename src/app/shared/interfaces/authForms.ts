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
  email_verified_at?: any;
  imgURL?: any;
  status: number;
  platform?: any;
  push_token?: any;
  roles: string[];
  date_create?: Date;
  date_update?: Date;
  date_delete?: any;
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
