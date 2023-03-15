import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, ButtonGroup, Chip, Modal, Typography } from "@mui/material";

import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { gameSelect, gameSlice } from "services/slices/gameSlice";

import { ROUTES } from "../../constants";

import { CardStatus, Color } from "./types/enums";
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
  const refCountTakeOneCard = useRef(0);
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
  const [isButtonExitDisplayed, setIsButtonExitDisplayed] = useState<true | false>(false);
  const [cardColor, setCardColor] = useState<Color | null>(null);

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
  }, []);

  useEffect(() => {
    if (shuffleArrayCards && ctx && canvas && gamersPositions) {
      if (activeGamer === gamersList[0].name) {
        clearIntervals(refTimers);

        const gamerCards = countGamerCards(gamersList[1].name, shuffleArrayCards);

        if (gamerCards === 0) {
          setWin(gamersList[1].name);
          setIsModalOpen(true);
        } else {
          const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[0].name);
          refTimers.current = { timer1, timer2 };

          const action = createNextActionAndArrayCardsForMoves(
            shuffleArrayCards,
            gamersList[0].name,
            cardColor,
            setCardColor
          )?.action;

          if (action === "move") {
            const handleClick = handleUserClick(
              canvas,
              ctx,
              gamersList,
              shuffleArrayCards,
              setShuffleArrayCards,
              setActiveGamer,
              gamersPositions,
              cardColor,
              setCardColor
            );

            document.addEventListener("click", handleClick);

            refCountTakeOneCard.current = 0;
          } else if (action === "skipTurn" || action === "reverseStroke") {
            setActiveGamer(gamersList[1].name);
          } else if (action === "takeOneCard") {
            if (refCountTakeOneCard.current === 0) {
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

                setActiveGamer(gamersList[0].name);

                refCountTakeOneCard.current++;

                clearTimeout(timer);
              }, 2000);
            } else {
              setActiveGamer(gamersList[1].name);

              refCountTakeOneCard.current = 0;
            }
          } else if (action === "takeTwoCards") {
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
          } else if (
            action === "selectCardColorForTakeFourCards" ||
            action === "selectCardColorForOrderColor"
          ) {
            const timer = setTimeout(() => {
              const arrCardsWithColors = shuffleArrayCards.filter(
                (item) =>
                  item.owner === gamersList[1].name &&
                  item.status === CardStatus.inHands &&
                  item.color
              );

              const arrColors = [Color.yellow, Color.red, Color.blue, Color.green];
              const randomColor = arrColors[Math.floor(Math.random() * arrColors.length)];

              if (arrCardsWithColors[0].color) {
                setCardColor(arrCardsWithColors[0].color as Color);
              } else {
                setCardColor(randomColor);
              }

              setActiveGamer(gamersList[0].name);

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
        } else {
          const [timer1, timer2] = signalizeName(ctx, gamersPositions, gamersList[1].name);
          refTimers.current = { timer1, timer2 };

          const nextActionAndArrayCardsForMoves = createNextActionAndArrayCardsForMoves(
            shuffleArrayCards as TShuffleArrayCards,
            gamersList[1].name,
            cardColor,
            setCardColor
          );

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
                copiedShuffleArrayCards
              );

              setActiveGamer(gamersList[0].name);

              refCountTakeOneCard.current = 0;

              clearTimeout(timer);
            }, 2000);
          } else if (
            nextActionAndArrayCardsForMoves?.action === "skipTurn" ||
            nextActionAndArrayCardsForMoves?.action === "reverseStroke"
          ) {
            setActiveGamer(gamersList[0].name);
          } else if (nextActionAndArrayCardsForMoves?.action === "takeOneCard") {
            if (refCountTakeOneCard.current === 0) {
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

                setActiveGamer(gamersList[1].name);

                refCountTakeOneCard.current++;

                clearTimeout(timer);
              }, 2000);
            } else {
              setActiveGamer(gamersList[0].name);

              refCountTakeOneCard.current = 0;
            }
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
          } else if (
            nextActionAndArrayCardsForMoves?.action === "selectCardColorForTakeFourCards" ||
            nextActionAndArrayCardsForMoves?.action === "selectCardColorForOrderColor"
          ) {
            setIsModalCardColorOpen(true);
          }
        }
      }

      if (refFirstGamerMove.current === 0) {
        const firstGamerMove = defineFirstGamerMove(
          shuffleArrayCards,
          gamersList,
          cardColor,
          setCardColor
        );
        if (firstGamerMove === gamersList[0].name) {
          setActiveGamer(gamersList[0].name);
        } else {
          setActiveGamer(gamersList[1].name);
        }
      }
      refFirstGamerMove.current++;
    }
  }, [shuffleArrayCards, gamersPositions, activeGamer, cardColor]);

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
          setIsButtonExitDisplayed,
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
      {isButtonExitDisplayed && (
        <Button
          variant="contained"
          sx={{ position: "absolute", top: "10px", left: "10px", zIndex: "1" }}
          onClick={() => navigate(ROUTES.gamePreparing.path)}
        >
          <LogoutIcon sx={{ transform: "rotate(180deg)" }} />
        </Button>
      )}
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
          }}
          color={
            cardColor === Color.yellow
              ? "warning"
              : cardColor === Color.red
              ? "error"
              : cardColor === Color.blue
              ? "primary"
              : "success"
          }
        />
      )}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setCardColor(null);
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
                setCardColor(Color.yellow);
                setIsModalCardColorOpen(false);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="warning"
            />
            <Button
              onClick={() => {
                setCardColor(Color.red);
                setIsModalCardColorOpen(false);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="error"
            />
            <Button
              onClick={() => {
                setCardColor(Color.blue);
                setIsModalCardColorOpen(false);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="primary"
            />
            <Button
              onClick={() => {
                setCardColor(Color.green);
                setIsModalCardColorOpen(false);
              }}
              sx={{ width: "80px", height: "40px" }}
              color="success"
            />
          </ButtonGroup>
        </Box>
      </Modal>
      <canvas ref={ref} className={styles.canvas} />
    </>
  );
}

export default memo(Game);
