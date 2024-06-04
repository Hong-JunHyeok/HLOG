import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { Skeleton } from "@/shared";

import CommentCard from "./comment-card";

import { useGetComments } from "../lib";

type ParamsType = {
  article_id: string;
};

const CommentList = () => {
  const { article_id } = useParams<ParamsType>();
  const { data } = useGetComments(article_id!);

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-10">
        <h3 className="text-xl">작성된 댓글이 없습니다.</h3>
      </div>
    );
  }

  return (
    <Suspense fallback={<Skeleton height={500} />}>
      {data.map((commentData) => (
        <CommentCard key={commentData.id} {...commentData} />
      ))}
    </Suspense>
  );
};

export default CommentList;