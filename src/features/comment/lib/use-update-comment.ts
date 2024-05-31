import { useMutation } from "@tanstack/react-query";

import { updateComment } from "../api";

const useUpdateComment = (commentId: string) =>
  useMutation({
    mutationFn: (body: string) => updateComment(commentId, body),
  });

export default useUpdateComment;
