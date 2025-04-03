export type Tuser={
    userId: string;
    _id: string;
    role: 'admin' | 'user'; 
    name: string;
    email: string;
    iat: number; 
    exp: number; 
    status:boolean;
  }
  