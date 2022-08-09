/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { Dashboard, ProgressBar, useUppy } from "@uppy/react";
import Uppy, { UppyOptions } from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { uploadCustomStyles } from "./uppy.twin";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { createAndSaveUserId } from "utils/utils";

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

  const uppyInstance = useUppy(() => {
    return new Uppy({
      ...uppyOptions,
    }).use(XHRUpload, {
      endpoint: `http://localhost:8000/upload?user_id=${userId}`,
      id: "uppyUpload",
    });
  });

  return (
    <div css={uploadCustomStyles} className="">
      <Dashboard
        id="uppyDashboard"
        uppy={uppyInstance}
        // plugins={["Url"]}
        height={300}
        width={800}
        showProgressDetails={true}
        proudlyDisplayPoweredByUppy={false}
        draggable={true}
        // inline={true}
      />
      {/* <ProgressBar
        // assuming `props.uppy` contains an Uppy instance:
        uppy={uppyInstance}
        fixed
        hideAfterFinish
      /> */}
    </div>
  );
};
