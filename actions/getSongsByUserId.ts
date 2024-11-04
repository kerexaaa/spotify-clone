import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@types";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  if (sessionError) {
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(`An error occured on getsongsbyuserid in line 27 ${error}`);
  }

  return (data as any) || [];
};

export default getSongsByUserId;
