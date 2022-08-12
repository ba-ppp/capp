import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as ArrowDown } from "asset/icons/arrow_drop_down.svg";

type Props = {
  imageUrl: string;
  caption?: string;
};

export const ThumbnailItem = (props: Props) => {
  const { imageUrl, caption } = props;
  return (
    <Card sx={{ maxWidth: 224 }} className="shadow-none mx-auto relative">
      <CardMedia
        component="img"
        alt="img"
        height="126"
        width="224"
        image={imageUrl}
      />
      <div className="absolute top-2 left-2 text-[14px] text-white border border-purple-500 bg-[#5551ff] p-2 rounded">
        Draft
      </div>
      <CardContent className="p-0 mt-2 min-h-[5rem] relative">
        <Typography
          className="font-semibold text-[18px] leading-5"
          variant="body2"
          color="text.secondary"
        >
          {caption}
        </Typography>
        <div className="absolute bottom-0 right-0 w-[40px] h-[40px] flex items-center">
          <div className="grow text-center">
            <ArrowDown />
          </div>
        </div>
      </CardContent>
      <div className="flex justify-between text-gray-400 text-[12px]">
        <span>04 Aug 2022 - 12:32</span>
        <span>JPG</span>
      </div>
    </Card>
  );
};
