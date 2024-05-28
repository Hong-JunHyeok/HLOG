import { ArticleType, generateRandomId, supabase } from "@/shared";

export type Params = {
  articleMetaData: {
    title: string;
    thumbnail?: File;
    body: string;
    summary: string;
    has_comments: boolean;
    has_like: boolean;
    has_hit: boolean;
  };
  thumbnailFile: File;
};

export const postArticle = async ({
  articleMetaData,
  thumbnailFile,
}: Params): Promise<ArticleType> => {
  const { data } = await supabase.storage
    .from("thumbnails")
    .upload(`${generateRandomId()}`, thumbnailFile, {
      cacheControl: "3600",
      upsert: false,
    });

  const response = await supabase
    .from("articles")
    .insert({
      title: articleMetaData.title,
      thumbnail: data?.path,
      body: articleMetaData.body,
      summary: articleMetaData.summary,
      has_comments: articleMetaData.has_comments,
      has_like: articleMetaData.has_like,
      has_hit: articleMetaData.has_hit,
    })
    .throwOnError()
    .select()
    .throwOnError()
    .single();

  return response.data;
};