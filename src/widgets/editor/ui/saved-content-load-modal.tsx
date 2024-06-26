import { Modal } from "@/shared";
import { useEditorStore } from "@/entities/article";

import { useEditorUtils } from "../hooks";

type Props = {
  onClose: () => void;
  open: boolean;
};

const SavedContentLoadModal = ({ open, onClose }: Props) => {
  const { loadSavedEditorMetaData } = useEditorUtils();
  const { setEditorMetaData, setContent } = useEditorStore();

  const loadContentToEditor = () => {
    const loadedContent = loadSavedEditorMetaData();

    if (loadedContent) {
      const { content, ...metaData } = loadedContent;
      setEditorMetaData(metaData);
      setContent(content);
    }

    onClose();
  };

  return (
    <Modal open={open}>
      <Modal.Header>이전에 작성된 글이 있습니다.</Modal.Header>
      <Modal.Content>해당 글을 불러오시겠습니까?</Modal.Content>
      <Modal.Footer align="right">
        <Modal.Button type="normal" onClick={onClose}>
          아니요
        </Modal.Button>
        <div className="ml-2" />
        <Modal.Button type="accept" onClick={loadContentToEditor}>
          네
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SavedContentLoadModal;
