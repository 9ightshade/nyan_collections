"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({
  user: null,
  login: async (email: string, password: string) => {},
  register: async (name: string, email: string, password: string) => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
});

interface LoginResponse {
  user: User | null;
  token: string;
  message?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}
interface RegisterResponse {
  user: User | null;
  token: string;
  message?: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    //check if user is logged in

    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userString = localStorage.getItem("user");
          const userData = userString ? JSON.parse(userString) : null;
          setUser(userData);
          setLoading(false);
        } catch (error) {
          console.error("Error parsing user data", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setLoading(false);
        }
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data: LoginResponse = await res.json();

    if (res.ok) {
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data: RegisterResponse = await res.json();

    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message || "Failed to register");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };


  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: login,
        register: register,
        logout: logout,
        isAuthenticated: !!user,
        loading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
