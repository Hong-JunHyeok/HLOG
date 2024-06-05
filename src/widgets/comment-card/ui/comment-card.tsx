import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import * as shared from "@/shared";
import { ArticleQueryKeys } from "@/entities/article";

import { DeleteCommentButton } from "@/features/delete-comment";
import { EditCommentButton } from "@/features/edit-comment";

type Params = {
  article_id: string;
};

const CommentCard = (props: shared.CommentType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams<Params>();

  const profileData = shared.useProfile(props.profiles.id);
  const { data: session } = shared.useSession();

  const articleData = queryClient.getQueryData<shared.ArticleType>(
    ArticleQueryKeys.detail(params.article_id!)
  );

  if (!articleData || !profileData) return null;

  return (
    <article className="px-6 pt-3 pb-6 mb-5 text-base rounded-lg bg-gray-50">
      <div className="flex items-center justify-start mb-2">
        <div
          className="flex items-center p-2 transition ease-in-out rounded-lg cursor-pointer hover:bg-black/10"
          onClick={() => navigate(`/profile/${profileData.id}`)}
        >
          <img
            src={profileData?.profile_url}
            alt={profileData.username}
            className="object-cover w-10 h-10 mr-3 rounded-full"
          />
          <span className="font-bold">{profileData.username}</span>
        </div>

        <shared.If
          condition={profileData.id === session?.user.id}
          trueRender={
            <>
              <span className="px-3 py-1 ml-3 text-sm text-white rounded-full bg-primary">
                작성자
              </span>

              <div className="ml-auto">
                <EditCommentButton commentId={props.id} body={props.body} />
                <DeleteCommentButton commentId={props.id} />
              </div>
            </>
          }
        />
      </div>
      <p className="text-black">{props.body}</p>
    </article>
  );
};

export default CommentCard;