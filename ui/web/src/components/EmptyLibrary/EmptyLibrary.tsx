import React from "react";
import { ReactComponent as EmptySvg } from "asset/images/empty_lib.svg";
import { useDispatch } from "react-redux";
import { toggleShowUploadModal } from "app/slices/toggleSlice";

export const EmptyLibrary = () => {
  const dispatch = useDispatch();

  const handleUpload = () => {
    dispatch(toggleShowUploadModal(true));
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center flex-col text-sonnant-dark items-center">
        <EmptySvg className="scale-[30%]" />
        <div className="-mt-36 text-center">
          <div className="text-[22px]">Your library is currently empty!</div>
          <div
            onClick={handleUpload}
            className="text-blue-500 mt-5 cursor-pointer"
          >
            Upload now
          </div>
        </div>
      </div>
    </div>
  );
};
