import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button } from "@mui/material";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type PlayerType = {
  url: string;
};

const Player: React.FC<PlayerType> = ({ url }) => {
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const refIsAudioPlay = useRef<true | false>(false);
  const [foo, setFoo] = useState(false);
  const toggle = () => {
    refIsAudioPlay.current = !refIsAudioPlay.current;
    setFoo(!foo);
  };

  useEffect(() => {
    refIsAudioPlay.current ? refAudio.current?.play() : refAudio.current?.pause();
  }, [refIsAudioPlay.current]);

  useLayoutEffect(() => {
    refAudio.current = new Audio(url);
    const handleEnded = () => refAudio.current?.play();
    const handleVisibilitychange = () => {
      if (document.hidden) {
        refAudio.current?.pause();
      } else {
        refIsAudioPlay.current ? refAudio.current?.play() : refAudio.current?.pause();
      }
    };

    refAudio.current?.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", handleVisibilitychange);

    return () => {
      refAudio.current?.pause();
      refAudio.current = null;
      document.removeEventListener("visibilitychange", handleVisibilitychange);
    };
  }, []);

  return (
    <Button
      variant="contained"
      sx={{ position: "absolute", top: "10px", left: "85px", zIndex: "1" }}
      onClick={toggle}
    >
      {refIsAudioPlay.current ? <VolumeUpIcon /> : <VolumeOffIcon />}
    </Button>
  );
};

export default Player;
