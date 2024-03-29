import { Box, Container, Link, Typography } from "@mui/material";

import { withErrorBoundary } from "hoc/withErrorBoundary";

import { ROUTES } from "../../constants";

export const AppFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        padding: "1rem 0 1.2rem",
        background: "var(--primary-light-color)",
        boxShadow: "inset 0 1px 0 0 rgb(255 255 255 / 10%)",
      }}
    >
      <Container maxWidth="md">
        <Link href={ROUTES.home.path}>
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

export const AppFooterWithErrorBoundary = withErrorBoundary(AppFooter);
