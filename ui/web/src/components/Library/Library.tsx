/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { UppyUploadModal } from "components/UploadModal/UploadModal";

export const Library = () => {
  const toggle = useSelector((state: RootState) => state.toggle);

  const uploadRef = useRef<any>(null);

  useEffect(() => {
    if (toggle.isShowUploadModal) {
      uploadRef.current.show();
    }

  }, [toggle.isShowUploadModal])

  return (
    <>
      <div
        className={`${toggle.isShowUploadModal ? "background_blur" : ""}`}
      />
      <UppyUploadModal ref={uploadRef} />
    </>
  );
};
