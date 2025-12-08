export interface Request {
  id: number;
  userName: string;
  email: string;
  message: string;
  createdAt: string;
  replied?: boolean;
  accepted?: boolean;
}
