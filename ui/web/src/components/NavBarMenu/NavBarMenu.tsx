/** @jsxImportSource @emotion/react */
import "twin.macro";
import React, { useEffect, useRef } from "react";
import { ReactComponent as UploadSvg } from "asset/icons/upload.svg";
import { UppyUploadModal } from "components/UploadModal/UploadModal";
import { useDispatch } from "react-redux";
import { toggleShowUploadModal } from "app/slices/toggleSlice";
import { getUserId } from "utils/utils";
import { Client, Message } from "paho-mqtt";

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
      console.log("onMessageArrived:" + message.payloadString);
    };
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({ onSuccess: onConnect });

    // called when the client connects
  }, []);

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
