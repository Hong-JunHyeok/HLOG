import { ArticleViewModeSelector } from "@/features/set-article-view-mode";
import { SortArticleSelector } from "@/features/sort-article";

const ArticleViewOptionToolbar = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <SortArticleSelector />

      <ArticleViewModeSelector />
    </div>
  );
};

export default ArticleViewOptionToolbar;
