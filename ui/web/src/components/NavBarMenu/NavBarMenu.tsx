/** @jsxImportSource @emotion/react */
import "twin.macro";
import React, { useEffect } from "react";
import { ReactComponent as UploadSvg } from "asset/icons/upload.svg";
import { useDispatch } from "react-redux";
import { toggleShowUploadModal } from "app/slices/toggleSlice";
import { getUserId } from "utils/utils";
import { Client, Message } from "paho-mqtt";
import { SearchBar } from "./SearchBar";
import { modifyThumbnailItem } from "app/slices/library.slice";


export function NavBarMenu() {
  const dispatch = useDispatch();

  const handleUpload = () => {
    dispatch(toggleShowUploadModal(true));
  };

  useEffect(() => {
    const client = new Client("localhost", 8083, getUserId());
    const onConnect = () => {
      // Once a connection has been made, make a subscription and send a message.
      client.subscribe(`captions/${getUserId()}`);
    };

    // called when the client loses its connection
    const onConnectionLost = (responseObject: any) => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };

    // called when a message arrives
    const onMessageArrived = (message: Message) => {
      const data = JSON.parse(message.payloadString);
      dispatch(modifyThumbnailItem(data));
    };
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({ onSuccess: onConnect });

    // called when the client connects
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-bg-200 h-[5rem] shadow-nav flex px-2">
        <div className="w-full flex items-center justify-between">
          <div className="w-[10%]" />
         
         <SearchBar />
          <button
            className="cursor-pointer justify-self-end border border-purple-200 p-3 flex items-center bg-purple-500 rounded-md text-white space-x-2"
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
