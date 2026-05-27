import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useAuthStore, useUserStore } from '@/store';
import type { Profile } from '@/types';

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setUser, setIsAuthenticated, setIsLoading } =
    useAuthStore();
  const { setProfile } = useUserStore();

  const loadUserProfile = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;
        if (data) {
          setUser(data as Profile);
          setProfile(data as Profile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    },
    [setProfile, setUser],
  );

  // Initialize auth session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          await loadUserProfile(data.session.user.id);
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        await loadUserProfile(session.user.id);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, [loadUserProfile, setUser, setIsAuthenticated, setIsLoading, setProfile]);

  const signUp = async (email: string, password: string, _username: string) => {
    try {
      void _username;
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // The database trigger in Supabase creates the profile row on signup.
      // We only need to continue if auth signup itself succeeded.

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await loadUserProfile(data.user.id);
        setIsAuthenticated(true);
      }

      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signUp,
    signIn,
    signOut,
  };
};

export default useAuth;
