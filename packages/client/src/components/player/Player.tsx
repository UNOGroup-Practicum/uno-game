import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button } from "@mui/material";

import React, { useEffect, useState } from "react";

const useAudio = (url: string) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    !isPlaying ? audio.play() : audio.pause();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audio.addEventListener("ended", () => audio.play());
    const onChangeVisibility = () => {
      console.log(isPlaying); // isPlaying всегда false!!! - почему?

      if (isPlaying) {
        if (document.hidden) {
          audio.pause();
        } else {
          audio.play();
        }
      }
    };
    document.addEventListener("visibilitychange", onChangeVisibility);
    return () => {
      audio.removeEventListener("ended", () => audio.play());
      document.removeEventListener("visibilitychange", onChangeVisibility);
      audio.pause();
    };
  }, []);

  return [isPlaying, toggle] as const;
};

type PlayerType = {
  url: string;
};
const Player: React.FC<PlayerType> = ({ url }) => {
  const [isPlaying, toggle] = useAudio(url);

  return (
    <Button
      variant="contained"
      sx={{ position: "absolute", top: "10px", left: "85px", zIndex: "1" }}
      onClick={toggle}
    >
      {isPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
    </Button>
  );
};

export default Player;
