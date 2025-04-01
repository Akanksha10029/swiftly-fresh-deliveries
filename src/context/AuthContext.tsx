
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { ProfileData, useAuthService } from '@/hooks/use-auth-service';

// Define the auth context type with explicit types
interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: ProfileData | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

// Create the context with undefined as the default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authService = useAuthService(navigate);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Using setTimeout to avoid recursive Supabase calls
          setTimeout(async () => {
            const profileData = await authService.fetchProfile(newSession.user.id);
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (initialSession?.user) {
        authService.fetchProfile(initialSession.user.id).then((data) => {
          setProfile(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle sign-in, sign-up, and sign-out with loading state management
  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.signIn(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      await authService.signUp(email, password, fullName);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authService.signOut();
    } finally {
      setLoading(false);
    }
  };

  // Create a simple value object to avoid recursive types
  const authContextValue = {
    session,
    user,
    profile,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
