import { TProduct } from "./carProduct.type";
import { TAllUser } from "./User.types";

export type TReview= {
  _id: string;
  review: string;
  rating: number;
  user: TAllUser;
  car: TProduct;
  isFlagged: boolean;
  flaggedReason: string;
  createdAt: string;
  updatedAt: string;
  result:[]
}
