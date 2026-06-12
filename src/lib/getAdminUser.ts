import { createServerSupabase } from "./supabaseServer";

export async function getAdminUser() {
  const supabase = createServerSupabase();
  const { data } = await supabase.auth.getUser();
  return data.user;
}
