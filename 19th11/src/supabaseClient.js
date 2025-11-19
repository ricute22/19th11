import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://auekqvkxjavuqvfmlnqs.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1ZWtxdmt4amF2dXF2Zm1sbnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMjI4NjYsImV4cCI6MjA3ODU5ODg2Nn0.gAueh9qXB2cOSz9JZV2IZ62AXQYnKiMbuk6hnV1qObE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
