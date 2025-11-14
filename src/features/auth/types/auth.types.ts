export interface RegisterFormData {
  fullName: string;
  phone: string;
  email: string;
  website: string;
  password: string;
  confirmPassword: string;
  subscribeEmail: boolean;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  website?: string;
  subscribeEmail?: boolean;
}

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
}
