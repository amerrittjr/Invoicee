import React, { createContext, useState, useEffect } from "react";
import { Client, Account } from "appwrite";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("674e187b000f402272bd");

  const account = new Account(client);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
