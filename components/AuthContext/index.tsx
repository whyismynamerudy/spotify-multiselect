'use client'

import { createContext, useState, ReactNode } from 'react';

// Define the context type
type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
};

// Create the initial context value (empty token)
const initialAuthContext: AuthContextType = {
    token: null,
    setToken: () => {},
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>(initialAuthContext);

// Create the AuthProvider to wrap your app
export default function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
  
    // Set the token value in the state
    const updateToken = (newToken: string | null) => {
      setToken(newToken);
    };
  
    return (
      <AuthContext.Provider value={{ token, setToken: updateToken }}>
        {children}
      </AuthContext.Provider>
    );
  };