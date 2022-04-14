export interface IUser {
  _id?: any;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password?:string;
  isDeleted?: boolean;
  status?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}