import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | any;

if (!supabaseUrl || !supabaseAnonKey) {
  // In local/dev environments we don't want the app to crash when Supabase
  // env vars are not provided. Use a safe stub with the minimal API
  // expected by the app so features degrade gracefully.
  console.warn('Supabase env vars not found — using stub client');

  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (_: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
    },
    from: (_: string) => ({
      select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
      insert: async () => ({ data: null, error: null }),
    }),
  };
} else {
  supabase = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
}

export { supabase };
export default supabase;
