import { RootState } from "app/store/store";
import { ReactComponent as UploadIcon } from "asset/icons/upload-icon.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { DragDrop, Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/dashboard/dist/style.css";

export default function UploadPage() {
    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
    };

    const uppy = new Uppy({
        meta: { type: "avatar" },
        restrictions: { maxNumberOfFiles: 100 },
        autoProceed: true,
    });

    uppy.use(Tus, { endpoint: "/upload" });

    uppy.on("complete", (result) => {
        const url = result.successful[0].uploadURL;
        console.log("xong", url);
    });

    return (
        <div className="pt-36 h-screen min-h-[800px] flex flex-col items-center justify-center">
            <div className="w-[1270px] p-6 min-h-[640px] bg-bg-200 text-bg-800 rounded-lg">
                <label className="bg-bg-400 flex flex-col items-center w-full h-[592px] text-4xl transition border border-bg-800 border-dashed rounded-lg appearance-none cursor-pointer hover:border-bg-600">
                    <span className="mt-28">
                        <UploadIcon width={70} />
                    </span>
                    <span className="font-medium mt-28">
                        Drop files here or{" "}
                        <span className="font-extrabold">click to upload </span>
                    </span>
                    <input
                        type="file"
                        name="file_upload"
                        className="hidden"
                        accept="image/*"
                        multiple={true}
                        onChange={handleSubmit}
                    />
                </label>
                <DragDrop
                    uppy={uppy}
                    locale={{
                        strings: {
                            // Text to show on the droppable area.
                            // `%{browse}` is replaced with a link that opens the system file selection dialog.
                            dropHereOr: "Drop here or %{browse}",
                            // Used as the label for the link that opens the system file selection dialog.
                            browse: "browse",
                        },
                    }}
                />
            </div>
        </div>
    );
}
