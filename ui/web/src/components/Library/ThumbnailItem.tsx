import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ReactComponent as ArrowDown } from "asset/icons/arrow_drop_down.svg";
import { ReactComponent as Voice } from "asset/icons/text_to_speech.svg";
import DefaultImage from "asset/images/default.png";
import { IThumbnailItem } from "types/utils.types";
import { getStatusText, isErrorItem } from "utils/utils";
import { useState } from "react";

type Props = {
  item: IThumbnailItem;
};

export const ThumbnailItem = (props: Props) => {
  const { item } = props;

  const { caption, imageURL, statusCode, uploadedAt, updatedAt } = item;

  const [isHovering, toggleHovering] = useState(false);

  const handleHover = () => {
    toggleHovering(!isHovering);
  };

  const handleClickVoice = () => {
    let speakText = new SpeechSynthesisUtterance(caption);
    let voices = window.speechSynthesis.getVoices();
    speakText.voice = voices?.[1];
    window.speechSynthesis.speak(speakText);
};

  return (
    <Card
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      sx={{ minWidth: 224 }}
      className="shadow-none mx-auto relative"
    >
      <div
        className="w-full h-[10rem] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageURL ?? DefaultImage})` }}
      />

      <div
        className={`absolute top-2 left-2 text-[14px] text-white border p-2 rounded ${
          isErrorItem(statusCode)
            ? "border-red-500 bg-red-500"
            : "border-purple-500 bg-purple-500"
        }`}
      >
        {getStatusText(statusCode)}
      </div>
      <CardContent className="p-0 mt-2 min-h-[5rem] relative">
        <Typography
          className="font-semibold text-[15px] leading-5 break-words max-w-[13rem]"
          variant="body2"
          color="text.secondary"
        >
          {caption ?? "Generating caption..."}
        </Typography>
        <div className="border_blue cursor-pointer absolute top-0 bottom-0 right-0 w-[40px] h-[40px] hover:w-[38px] hover:h-[38px] flex items-center">
          <div className="grow text-center">
            <ArrowDown />
          </div>
        </div>
        {isHovering && (
          <div onClick={handleClickVoice} className="border_blue cursor-pointer absolute bottom-0 right-0 w-[40px] h-[40px] hover:w-[38px] hover:h-[38px] flex items-center">
            <div className="grow text-center">
              <Voice />
            </div>
          </div>
        )}
      </CardContent>
      <div className="flex justify-between text-gray-400 text-[12px]">
        <span>{uploadedAt}</span>
        <span>{updatedAt}</span>
      </div>
    </Card>
  );
};
