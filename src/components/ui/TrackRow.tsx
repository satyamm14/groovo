import { Play } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Typography } from "./typography";

interface TrackRowProps {
  title: string;
  artist: string;
  album: string;
  year: string;
  language: string;
  duration: string;
}

export const TrackRow: React.FC<TrackRowProps> = ({
  title,
  artist,
  album,
  year,
  language = "Unknown",
  duration = "00:00",
}) => {
  return (
    <div className="group grid grid-cols-12 gap-4 items-center mb-2 p-2 bg-muted rounded-lg transition-colors">
      <div className="flex col-span-1 ml-3 items-center gap-2">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Checkbox />
        </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon">
            <Play className="w-4 h-4 text-primary" />
          </Button>
        </span>
      </div>
      <div className="grid grid-cols-12 gap-x-4 col-span-11">
        <div className="col-span-4">
          {" "}
          <Typography
            variant="body3"
            className="p-2 duration-75 transition-all text-left truncate rounded-md"
          >
            {title}
          </Typography>
        </div>
        <div className="col-span-3">
          <Typography
            variant="body3"
            className="p-2 duration-75 transition-all text-left hover:cursor-pointer truncate rounded-md hover:bg-black/10"
          >
            {artist}
          </Typography>
        </div>
        <div className="col-span-2">
          <Typography
            variant="body3"
            className="p-2 duration-75 transition-all text-left hover:cursor-pointer truncate rounded-md hover:bg-black/10"
          >
            {album}
          </Typography>
        </div>
        <div className="col-span-1">
          <Typography
            variant="body3"
            className="p-2 duration-75 transition-all text-left truncate rounded-md"
          >
            {year}
          </Typography>
        </div>
        <div className="col-span-1">
          <Typography
            variant="body3"
            className="p-2 duration-75 transition-all text-left truncate rounded-md"
          >
            {language}
          </Typography>
        </div>
        <div className="col-span-1">
          <Typography
            variant="body3"
            className="p-2 duration-75 transition-all text-left truncate rounded-md"
          >
            {duration}
          </Typography>
        </div>
      </div>
    </div>
  );
};
