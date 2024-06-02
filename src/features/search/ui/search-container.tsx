import { useRef } from "react";

import { Portal, useOutsideClick } from "@/shared";
import useSearchStore from "@/entities/search-input/model";

import SearchSelector from "./search-selector";
import SearchInput from "./search-input";

const SearchContainer = () => {
  const { isSearchOpen, setIsSearchOpen, reset } = useSearchStore();
  const overlayRef = useRef(null);

  const handleClose = () => {
    reset();
    setIsSearchOpen(false);
  };

  useOutsideClick(overlayRef, handleClose);

  return (
    <Portal portalId="search-portal">
      {isSearchOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen overflow-hidden backdrop-blur-md bg-black/30">
          <div
            className="absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white rounded-md max-w-[47rem] shadow-lg"
            ref={overlayRef}
          >
            <SearchInput />
            <SearchSelector />
          </div>
        </div>
      )}
    </Portal>
  );
};

export default SearchContainer;
