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

export interface InformationsUserInterface {
  user: {uuid?: string};
  description?: string;
  uev?: number;
  address: string;
  address1?: string;
  zip_code: string;
  city: string;
  created_date?: Date;
  updated_date?: Date;
}
