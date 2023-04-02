import LogoutIcon from "@mui/icons-material/Logout";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box, Button, ButtonGroup, Chip, Modal, Typography } from "@mui/material";

import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { gameSelect, gameSlice } from "services/slices/gameSlice";

import { ROUTES } from "../../constants";

import { Color } from "./types/enums";
import { TGamersList, TGamersPositions, TShuffleArrayCards } from "./types/typeAliases";
import cardsDistribution from "./utils/cardsDistribution";
import clearIntervals from "./utils/clearIntervals";
import countGamerCards from "./utils/countGamerCards";
import createGamersPositions from "./utils/createGamersPositions";
import createNextActionAndArrayCardsForMoves from "./utils/createNextActionAndArrayCardsForMoves";
import createShuffleArrayCards from "./utils/createShuffleArrayCards";
import createUserCards from "./utils/createUserCards";
import createUserCardsWithCoordinates from "./utils/createUserCardsWithCoordinates";
import defineFirstGamerMove from "./utils/defineFirstGamerMove";
import generateCardsDistribution from "./utils/generateCardsDistribution";
import handleActionTakeOneCard from "./utils/handleActionTakeOneCard";
import handleActionTakeTwoOrFourCards from "./utils/handleActionTakeTwoOrFourCards";
import handleRobotActionMove from "./utils/handleRobotActionMove";
import handleUserClick from "./utils/handleUserClick";
import signalizeName from "./utils/signalizeName";

import styles from "./Game.module.scss";

function Game() {
  const refFirstGamerMove = useRef(0);
  const refAmountRenders = useRef(0);
  const refTimers = useRef<{ timer1: number; timer2: number }>();
  const refCountTakeOneCard = useRef(0);
  const refCountTakeTwoCards = useRef(0);
  const refCountTakeFourCards = useRef(0);
  const refCountOrderColor = useRef(0);
  const refCardColor = useRef<Color | null>(null);
  const refCountSkipTurn = useRef(0);
  const refDeleteAnimation = useRef<true | false>(false);
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const { gameVariant } = useSelector(gameSelect);
  const { user } = useSelector(authSelect);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [gamersList, setGamersList] = useState<TGamersList>([]);
  const [shuffleArrayCards, setShuffleArrayCards] = useState<TShuffleArrayCards | null>(null);
  const [gamersPositions, setGamersPositions] = useState<TGamersPositions | null>(null);
  const [activeGamer, setActiveGamer] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<true | false>(false);
  const [isModalCardColorOpen, setIsModalCardColorOpen] = useState<true | false>(false);
  const [win, setWin] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<Color | null>(null);
  const [isVolumeUp, setIsVolumeUp] = useState<true | false>(true);

  useLayoutEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    setCanvas(canvas);
    setCtx(ctx);
    setGamersList([
      {
        id: "0",
        name: user?.firstName || "User",
      },
      {
        id: "0",
        name: "Robot",
      },
    ]);

    return () => {
      if (process.env.NODE_ENV === "production") {
        refDeleteAnimation.current = true;
      } else {
        if (refAmountRenders.current === 1) {
          refDeleteAnimation.current = true;
          refAmountRenders.current = 0;
        }
      }
      refAmountRenders.current++;
    };
  }, []);

  useEffect(() => {
    if (isVolumeUp) {
      refAudio.current?.play();
    } else {
      refAudio.current?.pause();
    }
  }, [isVolumeUp]);

  useEffect(() => {
    if (shuffleArrayCards && ctx && canvas && gamersPositions && !isModalCardColorOpen) {
      if (activeGamer === gamersList[0].name) {
        clearIntervals(refTimers);

        const gamerCards = countGamerCards(gamersList[1].name, shuffleArrayCards);

        if (gamerCards === 0) {
          setWin(gamersList[1].name);
          setIsModalOpen(true);
        } else {
          const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[0].name);
          refTimers.current = { timer1, timer2 };

          const nextActionAndArrayCardsForMoves = createNextActionAndArrayCardsForMoves(
            shuffleArrayCards,
            gamersList[0].name,
            refCountTakeTwoCards,
            refCountSkipTurn,
            refCountTakeFourCards,
            setCardColor,
            gamersList,
            refCardColor,
            setIsModalCardColorOpen,
            refCountOrderColor
          );

          if (nextActionAndArrayCardsForMoves?.action === "move") {
            const cardsWithCoordinates = createUserCardsWithCoordinates(
              canvas,
              ctx,
              gamersList[0].name,
              shuffleArrayCards
            );

            const handleClick = handleUserClick(
              canvas,
              ctx,
              gamersList,
              shuffleArrayCards,
              setShuffleArrayCards,
              setActiveGamer,
              gamersPositions,
              cardsWithCoordinates,
              nextActionAndArrayCardsForMoves.cardsForMoves,
              refCardColor,
              setCardColor
            );

            document.addEventListener("click", handleClick);

            refCountTakeOneCard.current = 0;
          } else if (nextActionAndArrayCardsForMoves?.action === "takeOneCard") {
            handleActionTakeOneCard(
              refCountTakeOneCard,
              shuffleArrayCards,
              gamersList,
              setShuffleArrayCards,
              canvas,
              ctx,
              gamersList[0].name,
              setActiveGamer,
              gamersPositions
            );
          } else if (
            nextActionAndArrayCardsForMoves?.action === "skipTurn" ||
            nextActionAndArrayCardsForMoves?.action === "reverseStroke"
          ) {
            setActiveGamer(gamersList[1].name);
          } else if (nextActionAndArrayCardsForMoves?.action === "takeTwoCards") {
            handleActionTakeTwoOrFourCards(
              2,
              shuffleArrayCards,
              gamersList,
              setShuffleArrayCards,
              canvas,
              ctx,
              setActiveGamer,
              gamersList[0].name,
              gamersPositions
            );
          } else if (nextActionAndArrayCardsForMoves?.action === "takeFourCards") {
            handleActionTakeTwoOrFourCards(
              4,
              shuffleArrayCards,
              gamersList,
              setShuffleArrayCards,
              canvas,
              ctx,
              setActiveGamer,
              gamersList[0].name,
              gamersPositions
            );
          }
        }
      } else if (activeGamer === gamersList[1].name) {
        clearIntervals(refTimers);

        const gamerCards = countGamerCards(gamersList[0].name, shuffleArrayCards);

        if (gamerCards === 0) {
          setWin(gamersList[0].name);
          setIsModalOpen(true);
        } else {
          const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[1].name);
          refTimers.current = { timer1, timer2 };

          const nextActionAndArrayCardsForMoves = createNextActionAndArrayCardsForMoves(
            shuffleArrayCards as TShuffleArrayCards,
            gamersList[1].name,
            refCountTakeTwoCards,
            refCountSkipTurn,
            refCountTakeFourCards,
            setCardColor,
            gamersList,
            refCardColor,
            setIsModalCardColorOpen,
            refCountOrderColor
          );

          if (nextActionAndArrayCardsForMoves?.action === "move") {
            handleRobotActionMove(
              shuffleArrayCards,
              nextActionAndArrayCardsForMoves,
              setShuffleArrayCards,
              canvas,
              ctx,
              gamersPositions,
              setActiveGamer,
              refCountTakeOneCard,
              gamersList
            );
          } else if (nextActionAndArrayCardsForMoves?.action === "takeOneCard") {
            handleActionTakeOneCard(
              refCountTakeOneCard,
              shuffleArrayCards,
              gamersList,
              setShuffleArrayCards,
              canvas,
              ctx,
              gamersList[1].name,
              setActiveGamer,
              gamersPositions
            );
          } else if (
            nextActionAndArrayCardsForMoves?.action === "skipTurn" ||
            nextActionAndArrayCardsForMoves?.action === "reverseStroke"
          ) {
            setActiveGamer(gamersList[0].name);
          } else if (nextActionAndArrayCardsForMoves?.action === "takeTwoCards") {
            handleActionTakeTwoOrFourCards(
              2,
              shuffleArrayCards,
              gamersList,
              setShuffleArrayCards,
              canvas,
              ctx,
              setActiveGamer,
              gamersList[1].name,
              gamersPositions
            );
          } else if (nextActionAndArrayCardsForMoves?.action === "takeFourCards") {
            handleActionTakeTwoOrFourCards(
              4,
              shuffleArrayCards,
              gamersList,
              setShuffleArrayCards,
              canvas,
              ctx,
              setActiveGamer,
              gamersList[1].name,
              gamersPositions
            );
          } else if (
            nextActionAndArrayCardsForMoves?.action === "selectCardColorForTakeFourCards" ||
            nextActionAndArrayCardsForMoves?.action === "selectCardColorForOrderColor"
          ) {
            setActiveGamer(gamersList[1].name);
          }
        }
      }

      if (refFirstGamerMove.current === 0) {
        const firstGamerMove = defineFirstGamerMove(
          shuffleArrayCards,
          gamersList,
          refCountTakeTwoCards,
          refCountSkipTurn,
          refCountTakeFourCards,
          setCardColor,
          refCardColor,
          setIsModalCardColorOpen,
          refCountOrderColor
        );
        if (firstGamerMove === gamersList[0].name) {
          setActiveGamer(gamersList[0].name);
        } else {
          setActiveGamer(gamersList[1].name);
        }
      }
      refFirstGamerMove.current++;
    }
  }, [shuffleArrayCards, gamersPositions, activeGamer, isModalCardColorOpen]);

  useEffect(() => {
    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (gameVariant === "solo") {
        const shuffleArrayCards = createShuffleArrayCards(gamersList);

        const gamersPositions = createGamersPositions(canvas, ctx, gamersList);

        setGamersPositions(gamersPositions);

        const createUserCardsDuringCardsDistribution = createUserCards(
          canvas,
          ctx,
          gamersList,
          shuffleArrayCards
        );

        const generator = generateCardsDistribution(0, gamersPositions.length);
        cardsDistribution(
          canvas,
          ctx,
          generator,
          gamersPositions,
          shuffleArrayCards,
          createUserCardsDuringCardsDistribution,
          setShuffleArrayCards,
          refDeleteAnimation,
          gamersPositions[0].cards[0],
          gamersPositions[0].cards[1]
        );
      } else if (gameVariant === "withFriends") {
        console.log("заглушка");
      } else {
        navigate(ROUTES.home.path);
      }
    }
  }, [gameVariant, canvas, ctx]);

  return (
    <>
      <Button
        variant="contained"
        sx={{ position: "absolute", top: "10px", left: "10px", zIndex: "1" }}
        onClick={() => navigate(ROUTES.home.path)}
      >
        <LogoutIcon sx={{ transform: "rotate(180deg)" }} />
      </Button>
      <Button
        variant="contained"
        sx={{ position: "absolute", top: "10px", left: "85px", zIndex: "1" }}
        onClick={() => setIsVolumeUp(!isVolumeUp)}
      >
        {isVolumeUp ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </Button>
      {cardColor && (
        <Chip
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "1",
            width: "36px",
            height: "36px",
            borderRadius: "20px",
            transform: "translate(-50%, -50%)",
            background: cardColor,
          }}
        />
      )}
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Победитель: {win}
          </Typography>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate(ROUTES.home.path);
                dispatch(gameSlice.actions.setGameVariant(null));
              }}
            >
              <LogoutIcon sx={{ transform: "rotate(180deg)" }} />
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate(ROUTES.gamePreparing.path, { state: "restart" });
                dispatch(gameSlice.actions.setGameVariant(null));
              }}
            >
              <RestartAltIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={isModalCardColorOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                setIsModalCardColorOpen(false);
                refCardColor.current = Color.yellow;
                setCardColor(Color.yellow);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="warning"
            />
            <Button
              onClick={() => {
                setIsModalCardColorOpen(false);
                refCardColor.current = Color.red;
                setCardColor(Color.red);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="error"
            />
            <Button
              onClick={() => {
                setIsModalCardColorOpen(false);
                refCardColor.current = Color.blue;
                setCardColor(Color.blue);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="primary"
            />
            <Button
              onClick={() => {
                setIsModalCardColorOpen(false);
                refCardColor.current = Color.green;
                setCardColor(Color.green);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="success"
            />
          </ButtonGroup>
        </Box>
      </Modal>
      <canvas ref={ref} className={styles.canvas} />
      <audio
        src="https://uno-group.hb.bizmrg.com/Blank_Jones_-_Sunny_Life_74528962.mp3"
        ref={refAudio}
        loop
      />
    </>
  );
}

export default memo(Game);
