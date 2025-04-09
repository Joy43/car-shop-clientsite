import { JwtPayload, jwtDecode } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

export const verifyToken = (token: string): CustomJwtPayload => {
  return jwtDecode<CustomJwtPayload>(token);
};
