export interface Feedback {
  id: number;
  userName: string;
  email: string;
  message: string;
  createdAt: string;
  replied?: boolean;
}
