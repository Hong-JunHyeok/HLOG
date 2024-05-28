import { CommentType, supabase } from "@/shared";

export const postComment = async (
  articleId: string,
  body: string
): Promise<CommentType> => {
  const response = await supabase
    .from("comments")
    .insert({
      body,
      article_id: articleId,
    })
    .throwOnError()
    .select()
    .throwOnError()
    .single();

  return response.data;
};