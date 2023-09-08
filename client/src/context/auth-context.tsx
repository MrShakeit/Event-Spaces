import { createContext, useContext, useEffect, useState } from "react";
import { SignInResponse } from "../pages/types/auth";
import { CreateUserDto, UserCredentials } from "../pages/types/users";
import { authenticationApi } from "../api/authentication-api";

type Status = "loading" | "authenticated" | "unauthenticated";

interface AuthContextType {
  permissionFlags: number | undefined;
  status: Status;
  signIn(credentials: UserCredentials): Promise<void>;
  signUp(signUpBody: CreateUserDto): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [permissionFlags, setPermissionFlags] = useState<number | undefined>();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const refreshToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const permissionFlags = Number(localStorage.getItem("permissionFlags"));
      try {
        if (accessToken) {
          setStatus("authenticated");
          setPermissionFlags(permissionFlags);
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
    setPermissionFlags(res.permissionFlags);
    setStatus("authenticated");
  };

  const signOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("permissionFlags");
    setPermissionFlags(undefined);
    setStatus("unauthenticated");
  };

  const setLocalStorage = (res: SignInResponse) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("permissionFlags", res.permissionFlags.toString());
  };

  return (
    <AuthContext.Provider
      value={{ permissionFlags, status, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
