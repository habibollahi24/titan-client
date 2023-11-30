import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")!)
      : null,
  );

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
