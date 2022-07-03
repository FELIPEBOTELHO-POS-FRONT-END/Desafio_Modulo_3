import { createContext, useContext } from "react";
import { IUser } from "../Interfaces/apiInterfaces";

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export const authContext = createContext<IAuthContext>({
  user: {
    nome: "Anônimo",
    email: "",
  },
  onSignOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
