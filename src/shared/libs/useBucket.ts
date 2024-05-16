import { generateRandomId, supabase } from ".";

type BucketName = "thumbnails" | "profiles" | "articles";

const useBucket = (bucketName: BucketName, url: string) => {
  const read = () => {
    const data = supabase.storage.from(bucketName).getPublicUrl(url);

    return data.data.publicUrl;
  };

  const write = async (file: File) => {
    const response = await supabase.storage
      .from(bucketName)
      .upload(`${bucketName}/${generateRandomId()}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    return response;
  };

  return { read, write };
};

export default useBucket;