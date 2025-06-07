import React, { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useAppContext } from "../../../contexts/context";
import { APP_LOGO_URL, APP_NAME, defaultLanguage } from "../../../appConst";
import Logo from "../Logo/Logo";
import AppName from "../AppName/AppName";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "./TopNav.css";
import LanguagesSectors from "../../../UI/widgets/LanguagesSectors/languagesSectors";

export default function topNav() {
  const {
    appCurrentTheme,
    toggleTheme,
    appLanguage,
    handelAppLanguage,
    isSidebar,
    openSidebar,
    closeSidebar,
    handelSidebar,
  } = useAppContext();
  useEffect(() => {
    openSidebar();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {}, [appCurrentTheme]);
  const theme = useTheme();
  // const { isOpenSidebar, setIsOpenSidebar, openSidebar, closeSidebar } =
  return (
    <div
      className={`${appCurrentTheme.value}-theme top-nav-wrp theme-bg border-bottom`}
    >
      <div className="top-nav">
        <div className="top-nav-left">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              handelSidebar(!isSidebar);
            }}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {APP_LOGO_URL && (
            <div className="top-nav-logo">
              <Logo />
            </div>
          )}
          {APP_NAME && (
            <div className="top-nav-app-name">
              <AppName />
            </div>
          )}
        </div>
        <div className="top-nav-right">
          <Box
            className="right-nav"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box>
              <LanguagesSectors />
            </Box>
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={4} color="error" sx={{ fontSize: 15 }}>
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>

            <IconButton color="inherit" sx={{ mr: 2 }}>
              <SettingsIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <PersonIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>

            <Box>
              <IconButton
                onClick={() => {
                  toggleTheme();
                }}
                color="inherit"
                size="small"
              >
                {appCurrentTheme.name == "Light" && (
                  <Tooltip title="Light">
                    <WbSunnyIcon />
                  </Tooltip>
                )}
                {appCurrentTheme.name == "Dark" && (
                  <Tooltip title="Dark">
                    <DarkModeIcon />
                  </Tooltip>
                )}
                {appCurrentTheme.name == "Transparent" && (
                  <Tooltip title="Transparent">
                    <AnalyticsIcon />
                  </Tooltip>
                )}
              </IconButton>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
