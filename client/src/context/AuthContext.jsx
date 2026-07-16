import { createContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
} from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      setUser(response.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (data) => {
    try {
      const response = await registerUser(data);
      setUser(response.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getProfile();
        setUser(response.user);
        setLoading(false);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
