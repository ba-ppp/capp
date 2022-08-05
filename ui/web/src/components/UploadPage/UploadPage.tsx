/** @jsxImportSource @emotion/react */
import "twin.macro";
import React, { useEffect } from "react";
import { Dashboard, useUppy } from "@uppy/react";
import Uppy, { UppyFile, UppyOptions } from "@uppy/core";
import UppyAwsS3 from '@uppy/aws-s3';
import XHRUpload from "@uppy/xhr-upload";
import { uploadCustomStyles } from "./upload.twin";
import Minio from "minio";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const basicTypes = [".jpg", ".jpeg", ".png"];

const uppyOptions: UppyOptions = {
  id: "uppy",
  autoProceed: false,
  debug: false,
  restrictions: {
    allowedFileTypes: [...basicTypes],
  
  },
  // locale: {
  //   strings: {
  //     companionError: "Connection with companion failed",
  //   },
  // },
};

export const UploadPage = () => {

  const uppyInstance = useUppy(() => {
    return new Uppy({ ...uppyOptions })
    .use(XHRUpload, { endpoint: `http://localhost:8000/upload`, id: 'uppyUpload' })
  });

  return (
    <div css={uploadCustomStyles} className="mt-36">
      <div>a</div>
      <Dashboard
        id="uppyDashboard"
        uppy={uppyInstance}
        // plugins={["Url"]}
        height={300}
        showProgressDetails={true}
        proudlyDisplayPoweredByUppy={false}
        // inline={true}
      />
    </div>
  );
};
