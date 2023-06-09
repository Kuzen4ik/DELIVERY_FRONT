import { createContext, useEffect, useMemo, useState } from "react";
import { postAuthLoginAPI, postAuthRegisterAPI } from "../api/api";
import { setSession } from "../utils/jwt";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      setSession(accessToken);
      setIsAdmin(true);
    }
  }, []);

  const signIn = async ({ email, password }) => {
    const response = await postAuthLoginAPI({ email, password });
    const { token } = response.data;
    setSession(token);
    setIsAdmin(true);
  };

  const signOut = () => {
    setSession(null);
    window.localStorage.removeItem("accessToken");
    setIsAdmin(false);
  };

  const signUp = async ({ email, password }) => {
    await postAuthRegisterAPI({ email, password });
  };

  const value = useMemo(
    () => ({ signIn, isAdmin, signOut, signUp }),
    [isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
