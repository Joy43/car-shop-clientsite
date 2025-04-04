import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TUser = {
  email: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
  status?: string;
  _id?: string;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};
 // Load user from localStorage
const initialState: TAuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'), 
  token: localStorage.getItem('token') || null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('token', token); 
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user'); 
      localStorage.removeItem('token');  
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
