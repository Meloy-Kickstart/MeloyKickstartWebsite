import { createClient } from "@supabase/supabase-js";

// Expect Vite-style env vars. Do NOT expose the service role key in the client.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Provide a clearer error in dev builds
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env not set. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env"
  );
}

export const supabase = createClient(SUPABASE_URL ?? "", SUPABASE_ANON_KEY ?? "");
