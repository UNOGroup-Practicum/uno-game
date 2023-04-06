import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button } from "@mui/material";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { usePageVisibility } from "services/hooks";

type PlayerType = {
  url: string;
};

const Player: React.FC<PlayerType> = ({ url }) => {
  const pageIsVisible = usePageVisibility();
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const toggle = () => {
    setIsAudioOn(!isAudioOn);
  };

  useLayoutEffect(() => {
    refAudio.current = new Audio(url);

    return () => {
      refAudio.current?.pause();
      refAudio.current = null;
    };
  }, []);

  useEffect(() => {
    if (!pageIsVisible) {
      refAudio.current?.pause();

      return;
    }

    if (isAudioOn) {
      refAudio.current?.play();

      return;
    }

    refAudio.current?.pause();
  }, [pageIsVisible, isAudioOn]);

  return (
    <Button
      variant="contained"
      sx={{ position: "absolute", top: "10px", left: "85px", zIndex: "1" }}
      onClick={toggle}
    >
      {isAudioOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
    </Button>
  );
};

export default Player;
