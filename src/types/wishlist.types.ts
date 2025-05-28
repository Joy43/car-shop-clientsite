import { TProduct } from "./carProduct.type";
import { TAllUser } from "./User.types";

export type TWishlistItem ={
  _id: string;
  user: TAllUser;
  car: TProduct;
  createdAt: string;
  updatedAt: string;

}