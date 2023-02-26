import { Container, Box, Typography, Link } from "@mui/material";
import { routes } from "../../constants";

export const AppFooter = () => {
  return (
    <Box
      sx={{
        marginTop: "auto",
        padding: "1rem 0 1.2rem",
        background: "var(--primary-light-color)",
        boxShadow: "inset 0 1px 0 0 rgb(255 255 255 / 10%)",
      }}
    >
      <Container maxWidth="md">
        <Link href={routes.home.path}>
          <Typography align="center" fontSize="20px" color="text.secondary" fontWeight="bold">
            Uno
          </Typography>
        </Link>
        <Typography align="center" fontSize="14px" color="text.disabled">
          Учебный проект, разработанный в рамках курса "Мидл фронтенд-разработчик".
        </Typography>
      </Container>
    </Box>
  );
};
