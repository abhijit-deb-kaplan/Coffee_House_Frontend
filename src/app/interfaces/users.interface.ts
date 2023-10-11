export interface IUserLoginResponse {
  success: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
}

export interface IUserSignupResponse {
  success: boolean;
}

export interface IUserSignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
