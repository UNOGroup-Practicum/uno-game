import { Box, Modal, Typography } from "@mui/material";

import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "services/hooks";
import { gameSelect, gameSlice } from "services/slices/gameSlice";

import { ROUTES } from "../../constants";

import { CardStatus } from "./types/enums";
import { TGamersList, TGamersPositions, TShuffleArrayCards } from "./types/typeAliases";
import cardsDistribution from "./utils/cardsDistribution";
import clearIntervals from "./utils/clearIntervals";
import countGamerCards from "./utils/countGamerCards";
import createCanvasCenter from "./utils/createCanvasCenter";
import createGamersPositions from "./utils/createGamersPositions";
import createNextActionAndArrayCardsForMoves from "./utils/createNextActionAndArrayCardsForMoves";
import createShuffleArrayCards from "./utils/createShuffleArrayCards";
import createUserCards from "./utils/createUserCards";
import createUserCardsWithCoordinates from "./utils/createUserCardsWithCoordinates";
import defineFirstGamerMove from "./utils/defineFirstGamerMove";
import generateCardsDistribution from "./utils/generateCardsDistribution";
import handleUserClick from "./utils/handleUserClick";
import setCardsAmountForGamer from "./utils/setCardsAmountForGamer";
import signalizeName from "./utils/signalizeName";

import styles from "./Game.module.scss";

function Game() {
  const refFirstGamerMove = useRef(0);
  const refTimers = useRef<{ timer1: NodeJS.Timer; timer2: NodeJS.Timer }>();
  const ref = useRef<HTMLCanvasElement>(null);
  const { gameVariant } = useSelector(gameSelect);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [gamersList, setGamersList] = useState<TGamersList>([]);
  const [shuffleArrayCards, setShuffleArrayCards] = useState<TShuffleArrayCards | null>(null);
  const [gamersPositions, setGamersPositions] = useState<TGamersPositions | null>(null);
  const [activeGamer, setActiveGamer] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<true | false>(false);
  const [win, setWin] = useState<string | null>(null);

  useLayoutEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    setCanvas(canvas);
    setCtx(ctx);
    setGamersList([
      {
        id: "0",
        name: "User",
      },
      {
        id: "0",
        name: "Robot",
      },
    ]);
  }, []);

  useEffect(() => {
    if (shuffleArrayCards && ctx && canvas && gamersPositions) {
      if (activeGamer === gamersList[0].name) {
        clearIntervals(refTimers);

        const gamerCards = countGamerCards(gamersList[1].name, shuffleArrayCards);

        if (gamerCards === 0) {
          setWin(gamersList[1].name);
          setIsModalOpen(true);
          console.log("win", gamersList[1].name);
        } else {
          const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[0].name);
          refTimers.current = { timer1, timer2 };

          const action = createNextActionAndArrayCardsForMoves(
            shuffleArrayCards,
            gamersList[0].name
          )?.action;

          console.log(gamersList[0].name, action);

          if (action === "move") {
            const handleClick = handleUserClick(
              canvas,
              ctx,
              gamersList,
              shuffleArrayCards,
              setShuffleArrayCards,
              setActiveGamer,
              gamersPositions
            );

            document.addEventListener("click", handleClick);
          } else if (action === "skip" || action === "reverse") {
            clearIntervals(refTimers);

            const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[0].name);
            refTimers.current = { timer1, timer2 };

            setActiveGamer(gamersList[1].name);
          } else if (action === "takeOneCard") {
            clearIntervals(refTimers);

            const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[0].name);
            refTimers.current = { timer1, timer2 };

            const timer = setTimeout(() => {
              const copiedShuffleArrayCards = [];
              let flag = false;

              for (let index = 0; index < shuffleArrayCards.length; index++) {
                if (
                  shuffleArrayCards[index].owner !== gamersList[0].name &&
                  shuffleArrayCards[index].owner !== gamersList[1].name &&
                  shuffleArrayCards[index].status === CardStatus.inDeck &&
                  !flag
                ) {
                  copiedShuffleArrayCards.push({
                    ...shuffleArrayCards[index],
                    owner: gamersList[0].name,
                    status: CardStatus.inHands,
                  });
                  flag = true;
                } else {
                  copiedShuffleArrayCards.push(shuffleArrayCards[index]);
                }
              }

              setShuffleArrayCards(copiedShuffleArrayCards);

              createUserCardsWithCoordinates(
                canvas as HTMLCanvasElement,
                ctx as CanvasRenderingContext2D,
                gamersList[0].name,
                copiedShuffleArrayCards
              );

              setActiveGamer(gamersList[1].name);

              clearTimeout(timer);
            }, 2000);
          } else if (action === "takeTwoCards") {
            clearIntervals(refTimers);

            const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[0].name);
            refTimers.current = { timer1, timer2 };

            const timer = setTimeout(() => {
              const copiedShuffleArrayCards = [];
              let flag = 0;

              for (let index = 0; index < shuffleArrayCards.length; index++) {
                if (
                  shuffleArrayCards[index].owner !== gamersList[0].name &&
                  shuffleArrayCards[index].owner !== gamersList[1].name &&
                  shuffleArrayCards[index].status === CardStatus.inDeck &&
                  flag !== 2
                ) {
                  copiedShuffleArrayCards.push({
                    ...shuffleArrayCards[index],
                    owner: gamersList[0].name,
                    status: CardStatus.inHands,
                  });
                  flag++;
                } else {
                  copiedShuffleArrayCards.push(shuffleArrayCards[index]);
                }
              }

              setShuffleArrayCards(copiedShuffleArrayCards);

              createUserCardsWithCoordinates(
                canvas as HTMLCanvasElement,
                ctx as CanvasRenderingContext2D,
                gamersList[0].name,
                copiedShuffleArrayCards
              );

              setActiveGamer(gamersList[1].name);

              clearTimeout(timer);
            }, 2000);
          } else if (action === "takeFourCards") {
            clearIntervals(refTimers);

            const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[0].name);
            refTimers.current = { timer1, timer2 };

            const timer = setTimeout(() => {
              const copiedShuffleArrayCards = [];
              let flag = 0;

              for (let index = 0; index < shuffleArrayCards.length; index++) {
                if (
                  shuffleArrayCards[index].owner !== gamersList[0].name &&
                  shuffleArrayCards[index].owner !== gamersList[1].name &&
                  shuffleArrayCards[index].status === CardStatus.inDeck &&
                  flag !== 4
                ) {
                  copiedShuffleArrayCards.push({
                    ...shuffleArrayCards[index],
                    owner: gamersList[0].name,
                    status: CardStatus.inHands,
                  });
                  flag++;
                } else {
                  copiedShuffleArrayCards.push(shuffleArrayCards[index]);
                }
              }

              setShuffleArrayCards(copiedShuffleArrayCards);

              createUserCardsWithCoordinates(
                canvas as HTMLCanvasElement,
                ctx as CanvasRenderingContext2D,
                gamersList[0].name,
                copiedShuffleArrayCards
              );

              setActiveGamer(gamersList[1].name);

              clearTimeout(timer);
            }, 2000);
          }
        }
      } else if (activeGamer === gamersList[1].name) {
        clearIntervals(refTimers);

        const gamerCards = countGamerCards(gamersList[0].name, shuffleArrayCards);

        if (gamerCards === 0) {
          setWin(gamersList[0].name);
          setIsModalOpen(true);
          console.log("win", gamersList[0].name);
        } else {
          const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[1].name);
          refTimers.current = { timer1, timer2 };

          const nextActionAndArrayCardsForMoves = createNextActionAndArrayCardsForMoves(
            shuffleArrayCards as TShuffleArrayCards,
            gamersList[1].name
          );
          console.log(gamersList[1].name, nextActionAndArrayCardsForMoves?.action);

          if (nextActionAndArrayCardsForMoves?.action === "move") {
            const timer = setTimeout(() => {
              const copiedShuffleArrayCards = shuffleArrayCards?.map((item) => {
                if (item.status === CardStatus.inHeap) {
                  return { ...item, status: CardStatus.inOutside };
                } else if (nextActionAndArrayCardsForMoves.cardsForMoves[0].id === item.id) {
                  return { ...item, status: CardStatus.inHeap };
                } else {
                  return item;
                }
              });

              setShuffleArrayCards(copiedShuffleArrayCards);

              const countRobotCards = copiedShuffleArrayCards.reduce(
                (acc, item) =>
                  item.owner === gamersList[1].name && item.status === CardStatus.inHands
                    ? (acc += 1)
                    : acc,
                0
              );

              setCardsAmountForGamer(
                ctx,
                gamersPositions[1].cards[0],
                gamersPositions[1].cards[1],
                countRobotCards.toString()
              );

              createCanvasCenter(
                canvas as HTMLCanvasElement,
                ctx as CanvasRenderingContext2D,
                (gamersPositions as TGamersPositions)[0].cards[1] + 30,
                copiedShuffleArrayCards,
                "right"
              );

              setActiveGamer(gamersList[0].name);

              clearTimeout(timer);
            }, 2000);
          } else if (
            nextActionAndArrayCardsForMoves?.action === "skip" ||
            nextActionAndArrayCardsForMoves?.action === "reverse"
          ) {
            setActiveGamer(gamersList[0].name);
          } else if (nextActionAndArrayCardsForMoves?.action === "takeOneCard") {
            const timer = setTimeout(() => {
              const copiedShuffleArrayCards = [];
              let flag = false;

              for (let index = 0; index < shuffleArrayCards.length; index++) {
                if (
                  shuffleArrayCards[index].owner !== gamersList[0].name &&
                  shuffleArrayCards[index].owner !== gamersList[1].name &&
                  shuffleArrayCards[index].status === CardStatus.inDeck &&
                  !flag
                ) {
                  copiedShuffleArrayCards.push({
                    ...shuffleArrayCards[index],
                    owner: gamersList[1].name,
                    status: CardStatus.inHands,
                  });
                  flag = true;
                } else {
                  copiedShuffleArrayCards.push(shuffleArrayCards[index]);
                }
              }

              setShuffleArrayCards(copiedShuffleArrayCards);

              setActiveGamer(gamersList[0].name);

              const countRobotCards = copiedShuffleArrayCards.reduce(
                (acc, item) =>
                  item.owner === gamersList[1].name && item.status === CardStatus.inHands
                    ? (acc += 1)
                    : acc,
                0
              );

              setCardsAmountForGamer(
                ctx,
                gamersPositions[1].cards[0],
                gamersPositions[1].cards[1],
                countRobotCards.toString()
              );

              clearTimeout(timer);
            }, 2000);
          } else if (nextActionAndArrayCardsForMoves?.action === "takeTwoCards") {
            const timer = setTimeout(() => {
              const copiedShuffleArrayCards = [];
              let flag = 0;

              for (let index = 0; index < shuffleArrayCards.length; index++) {
                if (
                  shuffleArrayCards[index].owner !== gamersList[0].name &&
                  shuffleArrayCards[index].owner !== gamersList[1].name &&
                  shuffleArrayCards[index].status === CardStatus.inDeck &&
                  flag !== 2
                ) {
                  copiedShuffleArrayCards.push({
                    ...shuffleArrayCards[index],
                    owner: gamersList[1].name,
                    status: CardStatus.inHands,
                  });
                  flag++;
                } else {
                  copiedShuffleArrayCards.push(shuffleArrayCards[index]);
                }
              }

              setShuffleArrayCards(copiedShuffleArrayCards);

              setActiveGamer(gamersList[0].name);

              const countRobotCards = copiedShuffleArrayCards.reduce(
                (acc, item) =>
                  item.owner === gamersList[1].name && item.status === CardStatus.inHands
                    ? (acc += 1)
                    : acc,
                0
              );

              setCardsAmountForGamer(
                ctx,
                gamersPositions[1].cards[0],
                gamersPositions[1].cards[1],
                countRobotCards.toString()
              );

              clearTimeout(timer);
            }, 2000);
          } else if (nextActionAndArrayCardsForMoves?.action === "takeFourCards") {
            const timer = setTimeout(() => {
              const copiedShuffleArrayCards = [];
              let flag = 0;

              for (let index = 0; index < shuffleArrayCards.length; index++) {
                if (
                  shuffleArrayCards[index].owner !== gamersList[0].name &&
                  shuffleArrayCards[index].owner !== gamersList[1].name &&
                  shuffleArrayCards[index].status === CardStatus.inDeck &&
                  flag !== 4
                ) {
                  copiedShuffleArrayCards.push({
                    ...shuffleArrayCards[index],
                    owner: gamersList[1].name,
                    status: CardStatus.inHands,
                  });
                  flag++;
                } else {
                  copiedShuffleArrayCards.push(shuffleArrayCards[index]);
                }
              }

              setShuffleArrayCards(copiedShuffleArrayCards);

              setActiveGamer(gamersList[0].name);

              const countRobotCards = copiedShuffleArrayCards.reduce(
                (acc, item) =>
                  item.owner === gamersList[1].name && item.status === CardStatus.inHands
                    ? (acc += 1)
                    : acc,
                0
              );

              setCardsAmountForGamer(
                ctx,
                gamersPositions[1].cards[0],
                gamersPositions[1].cards[1],
                countRobotCards.toString()
              );

              clearTimeout(timer);
            }, 2000);
          }
        }
      }

      if (refFirstGamerMove.current === 0) {
        const firstGamerMove = defineFirstGamerMove(shuffleArrayCards, gamersList);
        if (firstGamerMove === gamersList[0].name) {
          setActiveGamer(gamersList[0].name);
        } else {
          setActiveGamer(gamersList[1].name);
        }
      }
      refFirstGamerMove.current++;
    }
  }, [shuffleArrayCards, gamersPositions, activeGamer]);

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
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          dispatch(gameSlice.actions.setGameVariant(null));
        }}
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
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Победитель: {win}
          </Typography>
        </Box>
      </Modal>
      <canvas ref={ref} className={styles.canvas} />
    </>
  );
}

export default memo(Game);
