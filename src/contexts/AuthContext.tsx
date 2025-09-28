import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      // In a real app, you'd validate against a backend
      if (email && password) {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          username: email.split('@')[0],
          email,
          displayName: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        
        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual registration logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid input
      if (username && email && password) {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          email,
          displayName: username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
        };
        
        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};