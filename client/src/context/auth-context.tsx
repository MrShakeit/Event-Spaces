import { createContext, useContext, useEffect, useState } from "react";
import { SignInResponse } from "../pages/types/auth";
import {
  CreateUserDto,
  UserCredentials,
  UserDomain,
} from "../pages/types/users";
import { authenticationApi } from "../api/authentication-api";

//type Status = "loading" | "authenticated" | "unauthenticated";

interface AuthContextType {
  user?: UserDomain;
  status: string;
  signIn(credentials: UserCredentials): Promise<void>;
  signUp(signUpBody: CreateUserDto): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

//export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserDomain | undefined>();
  const [status, setStatus] = useState<string>("unauthenticated");

  useEffect(() => {
    const refreshToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        if (refreshToken) {
          const res = await authenticationApi.refreshToken(refreshToken);
          setLocalStorage(res);
          setUser(res.user);
          setStatus("authenticated");
          return;
        }
        setStatus("unauthenticated");
      } catch (error) {
        setStatus("unauthenticated");
      }
    };
    refreshToken();
  }, []);

  const signUp = async (signUpBody: CreateUserDto) => {
    return authenticationApi.signUp(signUpBody);
  };

  const signIn = async (credentials: UserCredentials) => {
    const res = await authenticationApi.signIn(credentials);
    setLocalStorage(res);
    setUser(res.user);
    setStatus("authenticated");
  };

  const signOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(undefined);
    setStatus("unauthenticated");
  };

  const setLocalStorage = (res: SignInResponse) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.user));
  };

  return (
    <AuthContext.Provider value={{ user, status, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
