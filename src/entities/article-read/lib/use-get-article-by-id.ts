import { PostgrestError } from "@supabase/supabase-js";
import { useSuspenseQuery } from "@tanstack/react-query";

import { QUERY_CONSTS } from "@/shared";

import { getArticleById } from "../api";

const useGetArticleById = (articleId: string) => {
  const queryKey = useGetArticleById.pk(articleId);
  const queryFn = async () => {
    try {
      const response = await getArticleById(articleId);

      if (!response.data) return null;

      return {
        id: response.data.id,
        has_comments: response.data.has_comments,
        has_hit: response.data.has_hit,
        has_like: response.data.has_like,
        likes: response.data.likes,
        summary: response.data.summary,
        thumbnail: response.data.thumbnail,
        title: response.data.title,
        created_at: response.data.created_at,
        body: response.data.body,
        hits: response.data.hits,
        user_id: response.data.user_id,
        profile: {
          user_id: response.data.user_id,
          username: response.data.username,
          profile_url: response.data.profile_url,
        },
      };
    } catch (error: unknown) {
      if ((error as PostgrestError).code === "PGRST116") return null;
    }
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

useGetArticleById.pk = (articleId: string) => [QUERY_CONSTS.ARTICLE, articleId];

export default useGetArticleById;