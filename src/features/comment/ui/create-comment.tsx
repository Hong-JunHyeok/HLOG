import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useToastStore } from "@/app/model";
import * as shared from "@/shared";

import { usePostComment } from "../lib";
import { FaLock } from "react-icons/fa6";
import { useFetchComments } from "@/entities/comment/lib";
import { ErrorMessage } from "@/shared";

type FieldValues = {
  comment: string;
};

type Params = { article_id: string };

const AuthenticatedView = () => {
  const params = useParams<Params>();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FieldValues>();

  const { mutateAsync, isPending } = usePostComment(params.article_id!);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.comment.trim() === "") {
      addToast({
        type: "warning",
        content: "댓글에 내용이 없습니다.",
        staleTime: 3000,
      });
      return;
    }

    mutateAsync(data.comment).then(() => {
      addToast({
        type: "success",
        content: "댓글 등록에 성공했습니다.",
        staleTime: 3000,
      });
      reset({
        comment: "",
      });
      queryClient.invalidateQueries({
        queryKey: useFetchComments.pk(params.article_id!),
      });
    });
  };
  return (
    <>
      <div className="mt-2 mb-2">
        <shared.TextArea
          {...register("comment", {
            required: "댓글은 공백이 되면 안됩니다.",
          })}
          id="comment"
          rows={4}
          placeholder="댓글을 입력해주세요..."
          disabled={isPending}
        />
      </div>

      <shared.Button
        type="submit"
        className="py-1.5 rounded-md text-white text-sm w-full transition ease-in-out"
        onClick={handleSubmit(onSubmit)}
        disabled={isPending || !isValid}
      >
        Comment
      </shared.Button>

      <ErrorMessage errors={errors} name="comment" />

      <p className="text-xs text-center text-gray-500 ms-auto mt-2">
        상대방을 향한 비난이나 욕설은 차단 등의 조치가 취해질 수 있습니다.
      </p>
    </>
  );
};

const UnauthenticatedView = () => {
  return (
    <div className="relative mb-5">
      <div className="absolute z-20 flex items-center justify-center flex-col w-full">
        <FaLock size={80} className="text-black/90" />
        <h3 className="font-bold text-2xl mt-5">
          댓글 작성 기능은 로그인 후 이용 가능합니다.
        </h3>
      </div>

      <div className="blur-md select-none">
        <div className="mt-2 mb-2">
          <textarea
            id="comment"
            rows={4}
            className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-4 outline-none"
            placeholder="댓글을 입력해주세요..."
          />
        </div>
        <shared.Button
          type="submit"
          className="py-1.5 rounded-md text-white text-sm w-full mt-10"
        >
          Comment
        </shared.Button>

        <p className="text-xs text-center text-gray-500 ms-auto">
          상대방을 향한 비난이나 욕설은 차단 등의 조치가 취해질 수 있습니다.
        </p>
      </div>
    </div>
  );
};

const CreateCommentForm = () => {
  return (
    <shared.Authentication
      authenticatedView={<AuthenticatedView />}
      unauthenticatedView={<UnauthenticatedView />}
    />
  );
};

export default CreateCommentForm;