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
      <div className="mt-10 w-[99vw] mx-auto">
        <div className="grid grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <ThumbnailItem
              key={index}
              caption="a"
              imageUrl="https://play.min.io:9000/capp-cloud-uploads/b8dabe18-28ef-4c24-a670-8617ee8a9124..jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=PVFVZUZCVBYJ0S93QVHK%2F20220812%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20220812T002219Z&amp;X-Amz-Expires=604800&amp;X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJQVkZWWlVaQ1ZCWUowUzkzUVZISyIsImV4cCI6MTY2MDI2Njk4NywicGFyZW50IjoiY2FwcF9jbG91ZCJ9.CYoq3KISqMF4zIJVpnV_gan91Jshv7xqaObr0ReYG9p0TVOsw5mQKzcxjG2Nl2sJPl-H5YHn10-OX47i4rbZ7g&amp;X-Amz-SignedHeaders=host&amp;versionId=null&amp;X-Amz-Signature=c2c9dff59b3ad2766fb7b30e1261708d0bf27fefcd704c49aff0f96ea9c5ec9d"
            />
          ))}
        </div>
      </div>
      <UppyUploadModal ref={uploadRef} />
    </>
  );
};
