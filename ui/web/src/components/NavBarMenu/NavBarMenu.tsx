/** @jsxImportSource @emotion/react */
import "twin.macro";
import React, { useRef } from "react";
import { ReactComponent as UploadSvg } from "asset/icons/upload.svg";
import { UppyUploadModal } from "components/UploadModal/UploadModal";
import { useDispatch } from "react-redux";
import { toggleShowUploadModal } from "app/slices/toggleSlice";

export function NavBarMenu() {
  const dispatch = useDispatch();

  const handleUpload = () => {
    dispatch(toggleShowUploadModal(true));
  };
  return (
    <>
      <div className="bg-bg-200 h-[5rem] shadow-nav flex px-2">
        <div className="w-full flex justify-end items-center">
          <button
            className="border border-purple-200 p-3 flex items-center bg-purple-500 rounded-md text-white space-x-2"
            onClick={handleUpload}
          >
            <UploadSvg fill="#fff" />
            <div>Upload</div>
          </button>
        </div>
      </div>
    </>
  );
}
