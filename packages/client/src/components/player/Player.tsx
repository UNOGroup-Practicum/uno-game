import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [newRender, setNewRender] = useState(false);
  const isPlaying = useRef<boolean>(false);

  const toggle = () => {
    isPlaying.current = !isPlaying.current;
    setNewRender(!newRender);
  };

  useEffect(() => {
    isPlaying.current ? audio.play() : audio.pause();
  }, [isPlaying.current]);

  useEffect(() => {
    audio.addEventListener("ended", () => audio.play());
    const onChangeVisibility = () => {
      if (isPlaying.current) {
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
    };
  }, []);

  return [isPlaying.current, toggle];
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

// How to use:
// import player from "../player/player";

// <Player url={"https://uno-group.hb.bizmrg.com/Blank_Jones_-_Sunny_Life_74528962.mp3"}/>
