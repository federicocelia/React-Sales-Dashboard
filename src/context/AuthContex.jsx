import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

//Auth functions (signin. sinup, logout)

//Session state (user info, sign-is status)

export const useAuth = () => {
  return useContext(AuthContext);
};
