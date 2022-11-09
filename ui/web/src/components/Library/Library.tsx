/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { UppyUploadModal } from "components/UploadModal/UploadModal";
import { ThumbnailItem } from "./ThumbnailItem";
import { isEmpty } from "lodash";
import { EmptyLibrary } from "components/EmptyLibrary/EmptyLibrary";
import { Language } from "enums/enums";

export const Library = () => {
  const toggle = useSelector((state: RootState) => state.toggle);
  const library = useSelector((state: RootState) => state.library);
  const global = useSelector((state: RootState) => state.global);
  const searchTerm = useSelector((state: RootState) => state.global.searchTerm);

  const filteredLibrary = library.items.filter((item) => {
    if (item.caption && item.captionVietnamese) {
      if (global.activeLanguage === Language.ENGLISH)
        return item?.caption?.toLowerCase().includes(searchTerm);
      return item?.captionVietnamese?.toLowerCase().includes(searchTerm);
    }
    return item;
  });

  const uploadRef = useRef<any>(null);

  useEffect(() => {
    if (toggle.isShowUploadModal) {
      uploadRef.current.show();
    }
  }, [toggle.isShowUploadModal]);

  return (
    <>
      <div className={`${toggle.isShowUploadModal ? "background_blur" : ""}`} />
      {isEmpty(filteredLibrary) ? (
        <EmptyLibrary />
      ) : (
        <div className="mt-10 mx-auto w-[99vw]">
          <div className="grid grid-cols-4 xl:grid-cols-6 gap-y-7 gap-x-5">
            {filteredLibrary.map((item, index) => (
              <ThumbnailItem key={index} item={item} />
            ))}
          </div>
        </div>
      )}
      <UppyUploadModal ref={uploadRef} />
    </>
  );
};
