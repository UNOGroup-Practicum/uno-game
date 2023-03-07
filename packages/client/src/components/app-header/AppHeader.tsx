import clsx from "clsx";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Divider,
  FormGroup,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useTheme } from "theme/useTheme";
import { Theme } from "theme/ThemeContext";

import { useSelector } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";

import { Picture } from "components/picture/Picture";

import logo from "assets/images/logo.png?quality=75&imagetools";
import logoWebp from "assets/images/logo.png?format=webp&quality=75&source&imagetools";

import { ROUTES } from "../../constants";

import styles from "./AppHeader.module.scss";

export const AppHeader = () => {
  const { user } = useSelector(authSelect);
  const { theme, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    // Todo: приделать logout
    event.preventDefault();
  };

  return (
    <header className={clsx("app-header", styles.root)}>
      <Container maxWidth="md" className={styles.container}>
        <nav className={styles.nav}>
          <ul className={clsx(styles.menu, styles.menu_left)}>
            <li className={styles.menu__item}>
              <NavLink className={styles.menu__link} to={ROUTES.gamePreparing.path}>
                ИГРАТЬ СЕЙЧАС
              </NavLink>
            </li>

            <li className={styles.menu__item}>
              {/* TODO: создать страницу с правилами и исправить ссылку */}
              <NavLink className={styles.menu__link} to={ROUTES.home.path}>
                Правила
              </NavLink>
            </li>
          </ul>

          <Link to={ROUTES.home.path} className={styles.logo}>
            <Picture webp={logoWebp}>
              <img src={logo} alt="Uno" width="205" height="184" />
            </Picture>
          </Link>

          <ul className={clsx(styles.menu, styles.menu_right)}>
            <li className={styles.menu__item}>
              <NavLink className={styles.menu__link} to={ROUTES.forum.path}>
                Форум
              </NavLink>
            </li>

            <li className={styles.menu__item}>
              {!user ? (
                <NavLink className={styles.menu__link} to={ROUTES.signIn.path}>
                  Вход
                </NavLink>
              ) : (
                <>
                  <button className={styles.menu__link} onClick={handleClick}>
                    {user.firstName}
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.2,
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <NavLink
                        className={clsx(styles.menu__link, styles["menu__link-v2"])}
                        to={ROUTES.leaderboard.path}
                      >
                        Лидербоард
                      </NavLink>
                    </MenuItem>

                    <MenuItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <NavLink
                        className={clsx(styles.menu__link, styles["menu__link-v2"])}
                        to={ROUTES.profile.path}
                      >
                        Профиль
                      </NavLink>
                    </MenuItem>

                    <Divider />
                    <MenuItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <a
                        href="#"
                        className={clsx(styles.menu__link, styles["menu__link-v2"])}
                        onClick={handleLogout}
                      >
                        Выход
                      </a>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </li>

            <li className={styles.menu__theme}>
              <FormGroup>
                <FormControlLabel
                  disableTypography={true}
                  control={
                    <Switch
                      onChange={toggleTheme}
                      checked={theme === Theme.DARK}
                      color="secondary"
                    />
                  }
                  label={
                    theme === Theme.DARK ? (
                      <Brightness7Icon fontSize="small" />
                    ) : (
                      <Brightness4Icon fontSize="small" />
                    )
                  }
                />
              </FormGroup>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
