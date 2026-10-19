import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase-client";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //Session state (user info, sign-in status)
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session:", error.message);
      }
    };

    getInitialSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed:", session);
    });
  }, []);

  //Auth functions (signin, signup, logout)
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-in error", error.message);
        return {
          success: false,
          error: error.message,
        };
      }
      console.log("Supabase sign-in success", data);
      return { success: true, data: data };
    } catch (error) {
      console.error("Unexpected error during sing-in; ", error.message);
      return {
        success: false,
        error: "An unexpected error occured. Please try again",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, signInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
