/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { UppyUploadModal } from "components/UploadModal/UploadModal";
import { ThumbnailItem } from "./ThumbnailItem";

export const Library = () => {
    const toggle = useSelector((state: RootState) => state.toggle);
    const library = useSelector((state: RootState) => state.library);

    const uploadRef = useRef<any>(null);

    useEffect(() => {
        if (toggle.isShowUploadModal) {
            uploadRef.current.show();
        }
    }, [toggle.isShowUploadModal]);

    return (
        <>
            <div
                className={`${
                    toggle.isShowUploadModal ? "background_blur" : ""
                }`}
            />
            <div className="mt-10 mx-auto w-[99vw]">
                <div className="grid grid-cols-4 xl:grid-cols-6 gap-y-7 gap-x-5">
                    {library.items.map((item, index) => (
                        <ThumbnailItem key={index} item={item} />
                    ))}
                </div>
            </div>
            <UppyUploadModal ref={uploadRef} />
        </>
    );
};
