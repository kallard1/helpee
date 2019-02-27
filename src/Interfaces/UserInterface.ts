export interface UserInterface {
  firstname: number;
  lastname: string;
  password: string;
  email: string;
  is_verified?: boolean;
  verification_token?: string;
  is_enabled?: boolean;
  is_banned?: boolean;
  role?: string;
  created_date?: Date;
  updated_date?: Date;
  loggued_date?: Date;
}
