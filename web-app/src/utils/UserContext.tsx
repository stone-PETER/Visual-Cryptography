import { createContext } from "react";

interface UserContextType {
  email: string;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  email: "",
});