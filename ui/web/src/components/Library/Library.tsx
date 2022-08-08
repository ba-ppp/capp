/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { UploadPage } from "components/UploadPage/UploadPage";
import { Client, Message } from "paho-mqtt";
import { getUserId } from "utils/utils";

export const Library = () => {
  const client = new Client("localhost", 8083, getUserId());
  const onConnect = () => {
    // Once a connection has been made, make a subscription and send a message.
    client.subscribe(`captions/${getUserId()}`);
    const message = new Message("Hello");
    message.destinationName = "World";
    client.send(message);
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

  return (
    <div className="mt-36">
      <UploadPage />
    </div>
  );
};
