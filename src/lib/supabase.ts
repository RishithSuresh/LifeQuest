import { createClient } from '@supabase/supabase-js';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type SessionResult = { data: { session: Session | null }; error: null };
type AuthResult = { data: { user: { id: string } | null; session: Session | null }; error: null };
type Subscription = {
  id: string;
  callback: (event: AuthChangeEvent, session: Session | null) => void;
  unsubscribe: () => void;
};

type MinimalAuthClient = {
  getSession: () => Promise<SessionResult>;
  onAuthStateChange: (
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) => { data: { subscription: Subscription } };
  signUp: (_credentials: { email: string; password: string }) => Promise<AuthResult>;
  signInWithPassword: (_credentials: { email: string; password: string }) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
};

type MinimalSupabaseClient = {
  auth: MinimalAuthClient;
  from: <TData = unknown>(_table: string) => {
    select: (_columns?: string) => {
      eq: (_column: string, _value: string) => {
        single: () => Promise<{ data: TData | null; error: null }>;
      };
    };
    insert: (_values: unknown) => Promise<{ data: null; error: null }>;
  };
};

declare global {
  var __lifequestSupabase: MinimalSupabaseClient | undefined;
}

const createStubClient = (): MinimalSupabaseClient => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: (callback) => ({
      data: {
        subscription: {
          id: 'stub-subscription',
          callback,
          unsubscribe: () => undefined,
        },
      },
    }),
    signUp: async (credentials) => {
      void credentials;
      return { data: { user: null, session: null }, error: null };
    },
    signInWithPassword: async (credentials) => {
      void credentials;
      return { data: { user: null, session: null }, error: null };
    },
    signOut: async () => ({ data: { user: null, session: null }, error: null }),
  },
  from: (table: string) => {
    void table;
    return {
      select: (_columns?: string) => ({
        eq: (_column: string, _value: string) => ({
          single: async () => ({ data: null as unknown, error: null }),
        }),
      }),
      insert: async (_values: unknown) => {
        void _values;
        return { data: null, error: null };
      },
    };
  },
});

let supabase: MinimalSupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not found — using stub client');
  supabase = createStubClient();
} else {
  supabase =
    globalThis.__lifequestSupabase ??
    (createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }) as unknown as MinimalSupabaseClient);

  if (!globalThis.__lifequestSupabase) {
    globalThis.__lifequestSupabase = supabase;
  }
}

export { supabase };
export default supabase;
