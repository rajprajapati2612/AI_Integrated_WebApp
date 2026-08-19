import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import {
  login,
  register,
  logout,
  getme,
} from "../services/auth.api";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  const {
    user,
    setUser,
    loading,
    setLoading,
  } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);

      const data = await login({
        email,
        password,
      });

      setUser(data.user);

      return data;
    } catch (error) {
      // Important: send error back to Login.jsx
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({
    username,
    email,
    password,
  }) => {
    try {
      setLoading(true);

      const data = await register({
        username,
        email,
        password,
      });

      setUser(data.user);

      return data;
    } catch (error) {
      // Send error back to Signup.jsx
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logout();

      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  

  return {
    setUser,
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    
  };
};