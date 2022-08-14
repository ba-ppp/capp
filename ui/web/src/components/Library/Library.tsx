/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { UppyUploadModal } from "components/UploadModal/UploadModal";
import { ThumbnailItem } from "./ThumbnailItem";

export const Library = () => {
  const toggle = useSelector((state: RootState) => state.toggle);

  const uploadRef = useRef<any>(null);

  useEffect(() => {
    if (toggle.isShowUploadModal) {
      uploadRef.current.show();
    }
  }, [toggle.isShowUploadModal]);

  return (
    <>
      <div className={`${toggle.isShowUploadModal ? "background_blur" : ""}`} />
      <div className="mt-10 min-w-[99vw] mx-auto">
        <div className="grid grid-cols-4 xl:grid-cols-6 gap-y-7">
          {Array(18).fill(true).map((_, index) => (
            <ThumbnailItem
              key={index}
              caption="a"
              imageUrl="https://loremflickr.com/320/240"
            />
          ))}
        </div>
      </div>
      <UppyUploadModal ref={uploadRef} />
    </>
  );
};
