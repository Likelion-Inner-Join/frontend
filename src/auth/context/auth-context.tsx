import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type UserRole = "club" | "user" | null;

type User = {
  name: string;
};

type TAuthState = {
  isAuthenticated: boolean;
  role: UserRole;
  user: User;
};

type TAuthContextType = {
  authState: TAuthState;
  login: (role: UserRole, user: User) => void;
  logout: () => void;
};

const initialAuthState: TAuthState = {
  isAuthenticated: false,
  role: null,
  user: {
    name: "",
  },
};

const AuthContext = createContext<TAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<TAuthState>(() => {
    const storedAuthState = localStorage.getItem("authState");
    return storedAuthState ? JSON.parse(storedAuthState) : initialAuthState;
  });

  const login = (role: UserRole, user: User) => {
    const newAuthState = { isAuthenticated: true, role, user };
    setAuthState(newAuthState);
    localStorage.setItem("authState", JSON.stringify(newAuthState));
  };

  const logout = () => {
    setAuthState(initialAuthState);
    localStorage.removeItem("authState");
  };

  const getCookieValue = (name: string): string | null => {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    return value ? decodeURIComponent(value) : null;
  };

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionExpiration = getCookieValue("sessionExpiration");
      const currentTime = new Date().getTime();

      if (!sessionExpiration || currentTime > parseInt(sessionExpiration)) {
        console.log("세션 만료로 로그아웃 처리");
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
