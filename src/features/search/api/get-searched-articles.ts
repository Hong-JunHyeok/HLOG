import { supabase } from "@/shared";

type ReturnType = {
  id: string;
  created_at: string;
  title: string;
  username: string;
};

const getSearchedArtiles = async (search: string) =>
  supabase
    .from("articles")
    .select("id, created_at, title")
    .textSearch("title", search)
    .returns<ReturnType[]>();

export default getSearchedArtiles;