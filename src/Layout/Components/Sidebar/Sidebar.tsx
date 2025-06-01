// crete reusable sidebar component
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../../../contexts/context";
import "./Sidebar.css";
import routes from "../../../routes";
import type { RouteType } from "../../../routes/routes";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { isSidebar, closeSidebar, handelSidebar, appCurrentTheme } =
    useAppContext();
  const location = useLocation(); // Add this line

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        (event.type === "keydown" &&
          (event as React.KeyboardEvent).key === "Tab") ||
        (event as React.KeyboardEvent).key === "Shift"
      ) {
        return;
      }
      handelSidebar(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    ></Box>
  );

  return (
    <div
      className={`${appCurrentTheme.value}-theme ${
        appCurrentTheme.value
      }-theme-sidebar theme-bg sidebar-wrp border-right full-height ${
        isSidebar ? "open" : "closed"
      }`}
    >
      <List className="sidebar-list">
        {routes.map((route: RouteType, index) => (
          <ListItem
            key={`menu-item-${index}`}
            className={`nav-item  ${
              location.pathname === route.path ? "nav-item-active" : ""
            }`}
          >
            <Link to={route.path} className="nav-link">
              {route.name}
            </Link>
            <div
              className={`${appCurrentTheme.value}-theme active-menu-icon-wrp theme-bg`}
            ></div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
