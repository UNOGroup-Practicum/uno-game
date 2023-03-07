import { Card, CardActionArea, Container, Typography } from "@mui/material";
import { memo } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

function GamePreparing() {
  return (
    <Container
      maxWidth="md"
      sx={{
        margin: "auto",
        padding: "8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Card sx={{ width: 280 }}>
        <CardActionArea sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
          <PersonOutlinedIcon sx={{ width: "auto", height: 80 }} />
          <Typography variant="h6" component="h6">
            Соло
          </Typography>
        </CardActionArea>
      </Card>
      <Card sx={{ width: 280 }}>
        <CardActionArea sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
          <GroupsOutlinedIcon sx={{ width: "auto", height: 80 }} />
          <Typography variant="h6" component="h6">
            Играть с друзьями
          </Typography>
        </CardActionArea>
      </Card>
    </Container>
  );
}

export default memo(GamePreparing);
