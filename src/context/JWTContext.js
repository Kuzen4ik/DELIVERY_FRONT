import { createContext, useMemo } from "react";
import { postAuthLoginAPI } from "../api/api";
import { setSession } from "../utils/jwt";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const signIn = async ({ email, password }) => {
    const response = await postAuthLoginAPI({ email, password });
    const { token } = response.data;
    setSession(token);
  };

  const value = useMemo(() => ({ signIn }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
