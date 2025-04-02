
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

// Define the interface for profile data
export interface ProfileData {
  id: string;
  full_name: string | null;
  address: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

// Define the return type for the auth service
export interface AuthServiceReturn {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<ProfileData | null>;
}

// Auth service hook that encapsulates authentication functionality
export const useAuthService = (navigate: (path: string) => void): AuthServiceReturn => {
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "You have been signed in",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<void> => {
    try {
      // Email validation with a more permissive regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // First check if user already exists
      const { data: existingUsers, error: searchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email);
      
      if (searchError) {
        console.error('Error checking existing user:', searchError);
      }
      
      if (existingUsers && existingUsers.length > 0) {
        // User exists, try to sign them in instead
        toast({
          title: "Account exists",
          description: "This email is already registered. Trying to sign you in...",
        });
        
        await signIn(email, password);
        return;
      }
      
      // Register new user with user metadata
      const { data, error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        // User is automatically signed in
        toast({
          title: "Success",
          description: "Your account has been created and you are now signed in.",
        });
        
        // Insert into chat history for first-time users
        if (data.user) {
          await supabase.from('chat_history').insert({
            user_id: data.user.id,
            message: "Welcome to our platform! How can I assist you today?",
            is_ai: true
          });
        }
        
        navigate('/');
      } else {
        toast({
          title: "Account created",
          description: "Please check your email for verification.",
        });
        
        navigate('/auth/signin');
      }
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "You have been signed out",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Explicitly define return type with no complex type inference
  const fetchProfile = async (userId: string): Promise<ProfileData | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      // Simple direct type assertion
      return data as ProfileData;
    } catch (error) {
      console.error('Exception fetching profile:', error);
      return null;
    }
  };

  // Return explicitly typed object
  return {
    signIn,
    signUp,
    signOut,
    fetchProfile
  };
};
