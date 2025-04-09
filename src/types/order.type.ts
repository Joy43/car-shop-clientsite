export type User = {
    email: string;
    name: string; 
    phone: string;
    address: string;
  };
  
  export type Product = {
    product: string;
    quantity: number;
    _id: string;
  };
  
  export type Transaction = {
    id: string;
    transactionStatus: string | null;
    bank_status: string;
    date_time: string;
    method: string;
    sp_code: string;
    sp_message: string;
  };
  
  export type TOrder = {
    user: User;
    email: string;
    products: Product[];
    details: string;
    quantity: number;
    totalPrice: number;
    transaction: Transaction;
    date: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    result: any;
    __v: number;
  };