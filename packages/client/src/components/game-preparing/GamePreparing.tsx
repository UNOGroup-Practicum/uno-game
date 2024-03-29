import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { nanoid } from "@reduxjs/toolkit";

import { FormEvent, memo, useCallback, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useDispatch } from "services/hooks";
import { gameSlice } from "services/slices/gameSlice";

import gamer from "assets/images/gamer.png";

import { ROUTES } from "../../constants";

function GamePreparing() {
  const [isWithFriendsCardClicked, setIsWithFriendsCardClicked] = useState<boolean>(false);
  const [isRoomCardClicked, setIsRoomCardClicked] = useState<boolean>(false);
  const [IDRoom, setIDRoom] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCircularProgress, setIsCircularProgress] = useState<true | false>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    if (searchParams.get("prestart") === "1") {
      setIsWithFriendsCardClicked(true);
      setIsRoomCardClicked(false);
    } else if (searchParams.get("prestart") === "2") {
      setIsRoomCardClicked(true);
      setIsWithFriendsCardClicked(false);
      setIDRoom(nanoid(4));
    } else {
      setIsWithFriendsCardClicked(false);
      setIsRoomCardClicked(false);
      dispatch(gameSlice.actions.setGameVariant(null));
    }
  }, [searchParams]);

  useLayoutEffect(() => {
    if (location.state === "restart") {
      const header = document.body.querySelector("header") as HTMLElement;
      const footer = document.body.querySelector("footer") as HTMLElement;
      header.style.display = "none";
      footer.style.display = "none";
      setIsCircularProgress(true);
      setTimeout(() => {
        navigate(ROUTES.game.path, { state: "" });
        dispatch(gameSlice.actions.setGameVariant("solo"));
        setIsCircularProgress(false);
      }, 1000);
    }
  }, [location]);

  const handleSoloCardClick = useCallback(() => {
    dispatch(gameSlice.actions.setGameVariant("solo"));
    navigate(ROUTES.game.path);
  }, []);

  const handleWithFriendsCardClick = useCallback(() => {
    dispatch(gameSlice.actions.setGameVariant("withFriends"));
    setSearchParams({
      prestart: "1",
    });
  }, []);

  const handleButtonBackClick = useCallback(() => {
    setSearchParams({});
  }, []);

  const handleButtonBackClick2 = useCallback(() => {
    setSearchParams({
      prestart: "1",
    });
  }, []);

  const handleRoomCardClick = useCallback(() => {
    setSearchParams({
      prestart: "2",
    });
  }, []);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
  }

  if (isCircularProgress) {
    return (
      <Backdrop sx={{ color: "#fff" }} open={isCircularProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isWithFriendsCardClicked) {
    return (
      <Container
        maxWidth="md"
        sx={{
          margin: "auto",
          padding: "8rem 0",
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          sx={{ position: "absolute", top: "10px", left: "24px" }}
          variant="contained"
          size="small"
          onClick={handleButtonBackClick}
        >
          Назад
        </Button>
        <form onSubmit={handleFormSubmit}>
          <Card sx={{ width: 280, height: "154px" }}>
            <TextField
              inputProps={{ maxLength: 4 }}
              id="id-room"
              label="ID комнаты"
              variant="outlined"
              sx={{ display: "block", margin: "20px auto 20px", width: 110 }}
            />
            <Button
              size="small"
              sx={{ display: "block", margin: "20px auto 20px" }}
              variant="contained"
              type="submit"
            >
              Войти в комнату
            </Button>
          </Card>
        </form>
        <Card
          sx={{
            width: 280,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "154px",
          }}
        >
          <GroupsOutlinedIcon sx={{ width: "auto", height: 80 }} />
          <Button
            size="small"
            sx={{ margin: "10px auto " }}
            variant="contained"
            onClick={handleRoomCardClick}
          >
            Создать комнату
          </Button>
        </Card>
      </Container>
    );
  } else if (isRoomCardClicked) {
    return (
      <Container
        maxWidth="md"
        sx={{
          margin: "auto",
          padding: "8rem 0",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          sx={{ position: "absolute", top: "10px", left: "24px" }}
          variant="contained"
          size="small"
          onClick={handleButtonBackClick2}
        >
          Назад
        </Button>
        <Typography textAlign="center" variant="h6" component="h6" marginBottom="20px">
          ID: {IDRoom}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {Array.from(Array(10)).map((_, index) => (
            <Grid item width={150} key={index}>
              <Card>
                <CardMedia
                  sx={{ objectFit: "contain" }}
                  component="img"
                  height={100}
                  image={gamer}
                  alt="Avatar"
                />
                <Typography textAlign="center" variant="h6" component="h6">
                  {index + 1}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          sx={{ width: "fit-content", margin: "30px auto 0" }}
          variant="contained"
          size="small"
        >
          Начать
        </Button>
      </Container>
    );
  } else {
    return (
      <Container
        maxWidth="md"
        sx={{
          margin: "auto",
          padding: "8rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Card sx={{ width: 280, height: "154px" }} onClick={handleSoloCardClick}>
          <CardActionArea sx={{ display: "flex", flexDirection: "column", height: "154px" }}>
            <PersonOutlinedIcon sx={{ width: "auto", height: 80 }} />
            <Typography variant="h6" component="h6">
              Соло
            </Typography>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 280 }} onClick={handleWithFriendsCardClick}>
          <CardActionArea sx={{ display: "flex", flexDirection: "column", height: "154px" }}>
            <GroupsOutlinedIcon sx={{ width: "auto", height: 80 }} />
            <Typography variant="h6" component="h6">
              Играть с друзьями
            </Typography>
          </CardActionArea>
        </Card>
      </Container>
    );
  }
}

export default memo(GamePreparing);
