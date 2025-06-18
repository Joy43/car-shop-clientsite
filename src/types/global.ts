import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TReview } from './review.types';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data: {
    result: T;
  };
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type CResponse<C> = {
  data?: C;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TReviewResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    result: TReview[];
  };
};


export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
export type CResponseRedux<C> = CResponse<C> & BaseQueryApi;


export type TQueryParam = {
    name: string;
    value: boolean | React.Key;
  };
  