import { createContext, useState, useContext, ReactNode } from "react";

type UserRole = "club" | "user" | null;

type TAuthState = {
  isAuthenticated: boolean;
  role: UserRole;
};

type TAuthContextType = {
  authState: TAuthState;
  login: (role: UserRole) => void;
  logout: () => void;
};

const initialAuthState: TAuthState = {
  isAuthenticated: false,
  role: null,
};

const AuthContext = createContext<TAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<TAuthState>(initialAuthState);

  const login = (role: UserRole) => {
    setAuthState({ isAuthenticated: true, role });
  };

  const logout = () => {
    setAuthState(initialAuthState);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): TAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
