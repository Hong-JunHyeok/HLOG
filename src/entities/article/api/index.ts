import { ArticleType, supabase } from "@/shared";

export const fetchArticle = (articleId: string) => {
  return supabase
    .from("articles")
    .select(
      `
        id,
        title,
        body,
        summary,
        thumbnail,
        created_at,
        profiles (username, profile_url)
      `
    )
    .match({ id: articleId })
    .throwOnError()
    .single<ArticleType>();
};

export const fetchArticles = () => {
  return supabase
    .from("articles")
    .select(
      `
        id,
        title,
        body,
        summary,
        thumbnail,
        created_at, 
        profiles (username)
      `
    )
    .returns<ArticleType[]>();
};
