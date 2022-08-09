/** @jsxImportSource @emotion/react */
import "twin.macro";
import { useEffect, useRef } from "react";
import { Client, Message } from "paho-mqtt";
import { getUserId } from "utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { UppyUploadModal } from "components/UploadModal/UploadModal";

export const Library = () => {
  const toggle = useSelector((state: RootState) => state.toggle);


  const uploadRef = useRef<any>(null);

  useEffect(() => {
    if (toggle.isShowUploadModal) {
      uploadRef.current.show();
    }

  }, [toggle.isShowUploadModal])

  // const client = new Client("localhost", 8083, getUserId());
  // const onConnect = () => {
  //   // Once a connection has been made, make a subscription and send a message.
  //   client.subscribe(`captions/${getUserId()}`);
  //   const message = new Message("Hello");
  //   message.destinationName = "World";
  //   client.send(message);
  // };

  // // called when the client loses its connection
  // const onConnectionLost = (responseObject: any) => {
  //   if (responseObject.errorCode !== 0) {
  //     console.log("onConnectionLost:" + responseObject.errorMessage);
  //   }
  // };

  // // called when a message arrives
  // const onMessageArrived = (message: Message) => {
  //   console.log("onMessageArrived:" + message.payloadString);
  // };
  // // set callback handlers
  // client.onConnectionLost = onConnectionLost;
  // client.onMessageArrived = onMessageArrived;

  // // connect the client
  // client.connect({ onSuccess: onConnect });

  // called when the client connects

  return (
    <>
      <div
        className={`${toggle.isShowUploadModal ? "background_blur" : ""}`}
      />
      <UppyUploadModal ref={uploadRef} />
    </>
  );
};
