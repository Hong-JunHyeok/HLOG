import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { getArticles } from "../api";
import { ArticleFilterType, articleKeyFactor } from "../query";

const useGetArticles = (filterType: ArticleFilterType) => {
  const queryKey = articleKeyFactor.list(filterType).queryKey;

  const queryFn = async ({ pageParam = 0 }) =>
    getArticles({
      ...filterType,
      page: pageParam,
    });

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }

      return allPages.length;
    },
  });
};

export default useGetArticles;
