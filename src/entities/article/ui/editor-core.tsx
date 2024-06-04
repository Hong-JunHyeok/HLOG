import { ContentBlock } from "draft-js";
import { lazy } from "react";

import * as shared from "@/shared";

import { blockRenderFn } from "../lib";

import "draft-js/dist/Draft.css";

const Editor = lazy(() =>
  import("draft-js").then((module) => ({ default: module.Editor }))
);

type Props = {
  readOnly?: boolean;
} & Draft.EditorProps;

const EditorCore = ({ readOnly = false, ...editorProps }: Props) => {
  const { open: openArticleOverlay } = shared.useOverlay();
  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    return shared.STYLE_MAPPER[type];
  };

  const handleOpenArticleDetail = (url: string) =>
    openArticleOverlay(({ isOpen, exit }) => (
      <shared.ImageDetailOverlay open={isOpen} onClose={exit} url={url} />
    ));

  return (
    <>
      <div id="hlog">
        <Editor
          spellCheck={false}
          readOnly={readOnly}
          blockStyleFn={blockStyleFn}
          blockRendererFn={(block) =>
            blockRenderFn(block, editorProps.editorState.getCurrentContent(), {
              onClick: handleOpenArticleDetail,
            })
          }
          {...editorProps}
        />
      </div>
    </>
  );
};

export default EditorCore;