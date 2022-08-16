/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { Dashboard, useUppy } from "@uppy/react";
import Uppy, { UppyOptions } from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { uploadCustomStyles } from "./uppy.twin";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { createAndSaveUserId } from "utils/utils";
import { useDispatch } from "react-redux";
import { addThumbnailItem } from "app/slices/library.slice";

const basicTypes = [".jpg", ".jpeg", ".png"];

const uppyOptions: UppyOptions = {
  id: "uppy",
  autoProceed: false,
  debug: false,
  restrictions: {
    allowedFileTypes: [...basicTypes],
  },
};

export const UppyUploader = () => {
  const userId = createAndSaveUserId();

  const dispatch = useDispatch();

  const uppyInstance = useUppy(() => {
    return new Uppy({
      ...uppyOptions,
    })
      .use(XHRUpload, {
        endpoint: `http://localhost:8000/upload?user_id=${userId}`,
        id: "uppyUpload",
      })
      .on("upload-success", (file, response) => {
        if (response.status !== 200) return;
        dispatch(addThumbnailItem(response.body))
      });
  });

  return (
    <div css={uploadCustomStyles} className="">
      <Dashboard
        id="uppyDashboard"
        uppy={uppyInstance}
        height={300}
        width={800}
        showProgressDetails={true}
        proudlyDisplayPoweredByUppy={false}
        draggable={true}

        // inline={true}
      />
    </div>
  );
};
