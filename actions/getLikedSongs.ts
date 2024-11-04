import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@types";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", sessionData.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(`An error occured on likedSongs line 20 ${error}`);
    return [];
  }

  if (!data) {
    return [];
  }

  return (
    (data.map((item) => ({
      ...item.songs,
    })) as any) || []
  );
};

export default getLikedSongs;
