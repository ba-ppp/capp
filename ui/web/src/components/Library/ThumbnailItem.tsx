import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DefaultImage from "asset/images/default.png";
import { IThumbnailItem } from "types/utils.types";
import { getStatusText, getUserId, isErrorItem } from "utils/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { Language } from "enums/enums";
import axios from "axios";
import { IconButton } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { isNil } from "lodash";

type Props = {
  item: IThumbnailItem;
};

export const ThumbnailItem = (props: Props) => {
  const { item } = props;

  const {
    caption,
    captionVietnamese,
    imageURL,
    statusCode,
    uploadedAt,
    updatedAt,
  } = item;

  const [isHovering, toggleHovering] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const { activeLanguage } = useSelector((state: RootState) => state.global);

  const currentCaption =
    activeLanguage === Language.VIETNAM ? captionVietnamese : caption;

  const handleHover = () => {
    toggleHovering(!isHovering);
  };

  const handleExport = async () => {
    if (activeLanguage === Language.VIETNAM) {
      window.open(item.audioVILink);
      return;
    }
    window.open(item.audioENLink);
  };

  const handleClickVoice = () => {
    if (isNil(audio)) return;
    audio.play();
  };

  useEffect(() => {
    if (isNil(audio)) {
      if (activeLanguage === Language.VIETNAM) {
        setAudio(new Audio(item.audioVILink));
        return;
      }
      setAudio(new Audio(item.audioENLink));
    } else {
      if (isNil(item.audioVILink) || isNil(item.audioENLink)) return;
      if (activeLanguage === Language.VIETNAM) {
        audio.src = item.audioVILink;
        return;
      }
      audio.src = item.audioENLink;
    }
  }, [activeLanguage, item.audioENLink, item.audioVILink]);

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
          className="font-semibold text-[15px] leading-5 break-words max-w-[12rem]"
          variant="body2"
          color="text.secondary"
        >
          {currentCaption ?? "Generating caption..."}
        </Typography>
        <IconButton
          onClick={handleClickVoice}
          className="absolute top-0 bottom-0 right-0 w-[40px] h-[40px]"
        >
          <RecordVoiceOverIcon />
        </IconButton>
        {isHovering && (
          <IconButton
            onClick={handleExport}
            className="absolute bottom-0 right-0 w-[40px] h-[40px]"
          >
            <FileDownloadIcon />
          </IconButton>
        )}
      </CardContent>
      <div className="flex justify-between text-gray-400 text-[12px]">
        <span>{uploadedAt}</span>
        <span>{updatedAt}</span>
      </div>
    </Card>
  );
};
