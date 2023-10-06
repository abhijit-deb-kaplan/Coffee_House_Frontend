export interface UserLoginResponse {
  success: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface UserSignupResponse {
  success: boolean;
}

export interface UserSignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
